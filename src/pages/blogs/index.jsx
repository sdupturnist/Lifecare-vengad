import Link from 'next/link';
import {wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Images from "@/components/Images";
import AOSInit from "@/components/Aos";
import Metatags from "@/components/Seo";





export default function Blogs({ blogPageData, pageComponentData }) {



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
      <Metatags data={pageComponentData}/>
      <AOSInit />
      <Layout>
        {/* PAGE TITLE START */}
        <div
          style={{ background: `url(${pageComponentData.data.pages.nodes[0].featuredImage.node.sourceUrl})` }}
          className="parallax-banner page-header aspect-[2/1] spacing-100 d-flex align-items-center justify-content-center text-center position-relative text-white"
        >
          <section className='cta'>
            <div className="content d-flex align-items-center justify-content-center">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1 className='heading-secondary'>{pageComponentData.data.pages.nodes[0].title}</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* PAGE TITLE  END */}
        <section className='spacing-100 pt-0'>
          <div className="container">
            <div className="row mt-5 pt-4" >
              {blogPageData.data.posts.nodes.map((blog, key) => {
                return <div className="col-xl-6 mb-4" key={key}>
                  <div className="box p-sm-4 p-3">
                    <Link rel="nofollow" aria-label="Blog" href={'blogs/' + blog.slug}>
                      <Images
                        placeholder={true}
                        imageurl={blog.featuredImage.node.sourceUrl}
                        styles={['opacity: 0.6']}
                        quality={80}
                        width={400}
                        height={400}
                        alt={blog.featuredImage.node.altText}
                        classes={'w-100 d-block rounded-3'}
                      />
                      <h2 className='heading-box text-tertiary mb-2'>{blog.title}</h2>
                      <p className='text-small text-primary mt-3'>{formatBlogDate(blog.date)}</p>
                    </Link>
                  </div>
                </div>
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    // BLOG PAGE DATA
    const blogDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          posts(first: 5) {
            nodes {
              databaseId
              title
              date
              slug
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }`,
      }),
    });

    const blogPageData = await blogDataResponse.json();

    // PAGE DATA
    const pageDataResponse = await fetch(wordpressGraphQlApiUrl, {
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
    });

    const pageComponentData = await pageDataResponse.json();

    // Pass fetched data as props to the page component
    return {
      props: {
        blogPageData,
        pageComponentData,
      },
      revalidate: 10, // Revalidate every 10 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    // Handle errors by returning fallback or empty data
    return {
      notFound: true, // Show a 404 page if an error occurs
    };
  }
}



