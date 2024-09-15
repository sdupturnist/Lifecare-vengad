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

export async function getServerSideProps(context) {
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


