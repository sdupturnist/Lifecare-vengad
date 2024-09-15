import Link from 'next/link';
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Images from "@/components/Images";
import AOSInit from "@/components/Aos";
import Metatags from "@/components/Seo";

export default function BlogSingle({ blogPageData, pageComponentData }) {

    function formatBlogDate(params) {
        let formattedDate = new Date(params).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        return formattedDate;
    }

    return (
        <>
            <Metatags data={pageComponentData} />
            <AOSInit />
            <Layout>
                <section className="spacing-100">
                    <div className="container">
                        <div className="col-12">
                            <h1 className='heading-secondary text-tertiary'>{blogPageData.data.posts.nodes[0].title}</h1>
                            <p className='text-small text-primary my-4'>{formatBlogDate(blogPageData.data.posts.nodes[0].date)}</p>

                            <Images
                                placeholder={true}
                                imageurl={blogPageData.data.posts.nodes[0].featuredImage.node.sourceUrl}
                                styles={''}
                                quality={80}
                                width={1000}
                                height={600}
                                alt={blogPageData.data.posts.nodes[0].featuredImage.node.altText}
                                classes={'w-100 d-block rounded-4 cover-image'}
                            />
                            <div className="mt-5 blog-content" dangerouslySetInnerHTML={{ __html: blogPageData.data.posts.nodes[0].content }} />
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export async function getStaticPaths() {
    try {
        // Fetch a list of slugs or IDs from your API or data source
        const response = await fetch(wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query {
                    posts {
                        nodes {
                            slug
                        }
                    }
                }`,
            }),
        });

        const { data } = await response.json();
        const paths = data.posts.nodes.map(post => ({
            params: { slug: post.slug }
        }));

        return { paths, fallback: 'blocking' };
    } catch (error) {
        console.error('Error fetching paths:', error);
        return { paths: [], fallback: 'blocking' };
    }
}

export async function getStaticProps(context) {
    const { slug } = context.params;

    try {
        // Fetch BLOG PAGE DATA
        const blogData = await fetch(wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query Posts {
                    posts(where: {name: "` + slug + `"}) {
                        nodes {
                            title
                            content
                            date
                            featuredImage {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                            seo {
                                canonical
                                metaDesc
                                metaKeywords
                                title
                                opengraphDescription
                                opengraphSiteName
                                opengraphUrl
                                opengraphImage {
                                    altText
                                    link
                                    sourceUrl
                                }
                                opengraphType
                                opengraphTitle
                                opengraphModifiedTime
                                twitterDescription
                                twitterTitle
                                twitterImage {
                                    sourceUrl
                                }
                            }
                        }
                    }
                }`,
            }),
            next: { revalidate: 10 },
        });

        const blogPageData = await blogData.json();

        // Fetch PAGE DATA
        const pageData = await fetch(wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query Posts {
                    pages(where: {id: 1179}) {
                        nodes {
                            title
                            featuredImage {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                            seo {
                                canonical
                                metaDesc
                                metaKeywords
                                title
                                opengraphDescription
                                opengraphSiteName
                                opengraphUrl
                                opengraphImage {
                                    altText
                                    link
                                    sourceUrl
                                }
                                opengraphType
                                opengraphTitle
                                opengraphModifiedTime
                                twitterDescription
                                twitterTitle
                                twitterImage {
                                    sourceUrl
                                }
                            }
                        }
                    }
                }`,
            }),
            next: { revalidate: 10 },
        });

        const pageComponentData = await pageData.json();

        return {
            props: {
                blogPageData,
                pageComponentData,
            },
            revalidate: 10, // Time in seconds to revalidate
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        // Handle error during data fetching
        return {
            notFound: true, // Optionally show a 404 page
        };
    }
}
