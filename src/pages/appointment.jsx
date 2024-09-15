import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import AOSInit from "@/components/Aos";
import Metatags from "@/components/Seo";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import RoundAnimation from "@/components/RoundAnimation";


export default function Appoinment({ contactPageData, contactComponentData }) {

  console.log(contactComponentData.data.allContactInfos.edges[0].node.contactInfoAcf)

    
    // Render your page content using the data
    return (
      <>
      <Metatags data={contactPageData}/>
        <AOSInit />
     <Layout>
     <AOSInit />
     <section className="spacing-100">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className='heading-secondary text-primary mb-5'>Send us Your feedback!</h1>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="box p-sm-5 d-lg-flex align-items-center justify-content-between" >
                  <p className="me-lg-5 text-normal">{contactComponentData.data.allContactInfos.edges[0].node.contactInfoAcf.apponmentPageTopBoxDescription}</p>
                  <Link rel="nofollow" aria-label="Call Us" href={"tel:" + contactComponentData.data.allContactInfos.edges[0].node.phone} class="btn btn-secondary btn-sm-full py-3 px-3 text-uppercase mt-4 mt-lg-0">Call us {contactComponentData.data.allContactInfos.edges[0].node.contactInfoAcf.phone}</Link>
                </div>
              </div>
            </div>
            <div className="row my-sm-5 my-4">
            <div className="col-12">
            <h2 className='heading-secondary text-primary' dangerouslySetInnerHTML={{ __html: contactComponentData.data.allContactInfos.edges[0].node.contactInfoAcf.contactFormHeading }} />
            </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <div className="box p-sm-5 d-md-flex align-items-center justify-content-between" >
                  <div className="row">
                    <div className="col-xl-4">
                      <p>
                        {contactComponentData.data.allContactInfos.edges[0].node.contactInfoAcf.contactFormDescription}
                      </p>
                    </div>
                    <div className="col-xl-5 offset-xl-2 mt-4 mt-xl-0">
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RoundAnimation />
      </section>
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
            pages(where: {id: 1110}) {
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
  
      const contactPageData = await pageDataResponse.json();
  
      // DOCTORS DATA
      const contactDataResponse = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query Posts {
            allContactInfos {
              edges {
                node {
                  content
                  contactInfoAcf {
                    address
                    email
                    facebook
                    instagram
                    phone
                    appointmentPageTopBoxDescription
                    contactFormDescription
                    contactFormHeading
                  }
                }
              }
            }
          }`,
        }),
      });
  
      const contactComponentData = await contactDataResponse.json();
  
      // Pass fetched data as props to the page component
      return {
        props: {
          contactPageData,
          contactComponentData,
        },
        revalidate: 10, // Revalidate the static page every 10 seconds
      };
    } catch (error) {
      console.error('Error fetching data:', error);
  
      // Handle errors by returning fallback or empty data
      return {
        notFound: true, // Show a 404 page if there is an error
      };
    }
  }
  