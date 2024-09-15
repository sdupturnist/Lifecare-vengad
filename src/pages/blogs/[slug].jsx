import Link from 'next/link';
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Images from "@/components/Images";
import AOSInit from "@/components/Aos";
import Metatags from "@/components/Seo";

import { useRouter } from 'next/router';




export default function BlogSingle({ blogPageData, pageComponentData }) {

    console.log(blogPageData.data.posts.nodes[0])


    function formatBlogDate(params) {

        let formattedDate = new Date(params).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: "2-digit",
            minute: "2-digit",
            hour12: false

        })

        return formattedDate

    }

    //console.log(pageComponentData.data.pages.nodes[0])

    // Render your page content using the data
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

export async function getServerSideProps(context) {

    const { params } = context;

    const { slug } = params


    // Fetch data from an external API, database, or any other source
    try {

        //BLOG PAGE DATA
        const blogData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: ` query Posts {
            posts(where: {name: "`+ slug + `"}) {
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
       }
          `,
            }),
            next: { revalidate: 10 },
        },
            {
                cache: 'force-cache',
                cache: 'no-store'
            }
        );

        const blogPageData = await blogData.json();

        // -------------------------------------------------------------

        //HOME FOOTER DATA
        const footerData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: ` query Posts {
          allContactInfos {
            edges {
              node {
                content
                contactInfoAcf {
                  address
                  email
                  facebook
                  fieldGroupName
                  instagram
                  phone
                }
              }
            }
          }
    }
          `,
            }),
            next: { revalidate: 10 },
        },
            {
                cache: 'force-cache',
                cache: 'no-store'
            }
        );

        const footerComponentData = await footerData.json();

        // -------------------------------------------------------------

        //HOME HEADER DATA
        const headerData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: ` query Posts {
          mediaItems(where: {name: "site-logo"}) {
            nodes {
              altText
              sourceUrl
            }
          }
        }
          `,
            }),
            next: { revalidate: 10 },
        },
            {
                cache: 'force-cache',
                cache: 'no-store'
            }
        );

        const headerComponentData = await headerData.json();

        // -------------------------------------------------------------

        //PAGE DATA
        const pageData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: ` query Posts {
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
    }
          `,
            }),
            next: { revalidate: 10 },
        },
            {
                cache: 'force-cache',
                cache: 'no-store'
            }
        );

        const pageComponentData = await pageData.json();



        // -------------------------------------------------------------

        // Pass fetched data as props to the page component
        return {
            props: {
                blogPageData,
                pageComponentData,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        // If an error occurs during data fetching, you can handle it here
        // For example, you might want to redirect to an error page
        return {
            redirect: {
                destination: '/error',
                permanent: false,
            },
        };
    }
}


