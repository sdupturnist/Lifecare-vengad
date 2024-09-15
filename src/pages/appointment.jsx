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
  
  export async function getServerSideProps(context) {
    // Fetch data from an external API, database, or any other source
    try {
  
      //HOME PAGE DATA
      const pageData = await fetch(
        wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `  query Posts {
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
  
      const contactPageData = await pageData.json();
  

     //DOCTORS DATA
     const contactData = await fetch(
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
                        instagram
                        phone
                        apponmentPageTopBoxDescription
                        contactFormDescription
                        contactFormHeading
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
  
    const contactComponentData = await contactData.json();
    
  // -------------------------------------------------------------
  
      // Pass fetched data as props to the page component
      return {
        props: {
            contactPageData,
             contactComponentData 
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