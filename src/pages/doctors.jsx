
import Head from "next/head";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import AOSInit from "@/components/Aos";
import Images from "@/components/Images";
import SectionBanner from "@/components/SectionBanner";
import Metatags from "@/components/Seo";





export default function DoctorsPage({ doctorsPageData, doctorComponentData }) {

  
    // Render your page content using the data
    return (
      <>
      <Metatags data={doctorsPageData}/>
        <AOSInit />
     <Layout>
     <AOSInit />
      {/* PAGE TITLE START */}
      <div
        style={{ background: `url(${doctorsPageData.data.pages.nodes[0].featuredImage.node.sourceUrl})` }}
        className="parallax-banner page-header aspect-[2/1] spacing-100 d-flex align-items-center justify-content-center text-center position-relative text-white"
      >
        <section className='cta'>
          <div className="content d-flex align-items-center justify-content-center">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className='heading-secondary mb-sm-4 mb-2'>{doctorsPageData.data.pages.nodes[0].title}</h1>
                  <p className='mb-0 mt-sm-4 mt-2'>{doctorsPageData.data.pages.nodes[0].pageACF.subHeading}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* PAGE TITLE  END */}
      {/* ABOUT SECTION START */}
      <section className='about-section spacing-100 pb-0 text-tertiary '>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-normal" data-aos="fade-up" data-aos-delay={500} dangerouslySetInnerHTML={{ __html: doctorsPageData.data.pages.nodes[0].pageACF.about }} />
              <hr className='mt-5 border-1' />
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT SECTION END */}
      {/* DOCTORS SECTION START */}
      <section className='spacing-100 pt-0 text-tertiary pt-sm-5 mt-sm-5'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {doctorComponentData.data.doctors.nodes.map((doctor, key) => {
                return (<>
                  <div className="sticky-column clearfix" id={doctor.doctorACF.id} key={key} data-aos="fade-up">
                    <div className="left sticky">
                      <h2 className='heading-secondary text-tertiary text-capitalize'>{doctor.categories.nodes[0].name}</h2>
                      <p className='mt-3'>{doctor.categories.nodes[0].description}</p>
                    </div>
                    <div className="right">
                      <div className="box mb-5">
                        <Images
                          placeholder={true}
                          imageurl={doctor.featuredImage.node.sourceUrl}
                          styles={''}
                          quality={80}
                          width={250}
                          height={250}
                          alt={doctor.featuredImage.node.altText}
                          classes={'doctor-photo d-block w-100 mx-auto'}
                        />
                        <h3 className='heading-tertiary'>{doctor.title}</h3>
                        <span className='time'>{doctor.doctorACF.time}</span>
                        <div dangerouslySetInnerHTML={{ __html: doctor.content }} />
                      </div>
                    </div>
                  </div>
                </>)
              })}
            </div>
          </div>
        </div>
      </section>
      {/* DOCTORS SECTION END */}
      <SectionBanner background={doctorsPageData.data.pages.nodes[0].featuredImage.node.sourceUrl} heading={doctorsPageData.data.pages.nodes[0].pageACF.ctaBannerHeading} description={doctorsPageData.data.pages.nodes[0].pageACF.ctaBannerDescription} link={doctorsPageData.data.pages.nodes[0].pageACF.ctaButtonUrl} button={doctorsPageData.data.pages.nodes[0].pageACF.ctaButtonLabel} />
{/*  */}
     </Layout>
      </>
    );
  }
  
  export async function getStaticProps() {
    try {
      // HOME PAGE DATA
      const pageDataResponse = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query Posts {
            pages(where: {id: 44}) {
              nodes {
                title
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                pageACF {
                  about
                  sectionDescription
                  sectionHeading
                  subHeading
                  ctaBannerHeading
                  ctaBannerDescription
                  ctaButtonLabel
                  ctaButtonUrl
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
  
      const doctorsPageData = await pageDataResponse.json();
  
      // DOCTORS DATA
      const doctorDataResponse = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query Posts {
            doctors {
              nodes {
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
                title
                content
                categories {
                  nodes {
                    taxonomyName
                    termTaxonomyId
                    name
                    description
                  }
                }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                doctorACF {
                  time
                  id
                }
              }
            }
          }`,
        }),
      });
  
      const doctorComponentData = await doctorDataResponse.json();
  
      // Pass fetched data as props to the page component
      return {
        props: {
          doctorsPageData,
          doctorComponentData,
        },
        revalidate: 10, // Revalidate every 10 seconds
      };
    } catch (error) {
      console.error('Error fetching data:', error);
  
      // Handle errors by returning a fallback or empty data if needed
      return {
        notFound: true, // Display a 404 page if an error occurs
      };
    }
  }
  