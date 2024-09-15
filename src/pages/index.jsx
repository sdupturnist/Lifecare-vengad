import Link from 'next/link';
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Doctors from "@/components/Doctors";
import RoundAnimation from "@/components/RoundAnimation";
import AOSInit from "@/components/Aos";
import Images from "@/components/Images";
import Metatags from '@/components/Seo';





export default function Home({ homePageData, doctorComponentData, allPostsData }) {


 // console.log(allPostsData.data.posts.nodes)

  const pageDataGet = homePageData.data.pages.edges

  const acf = pageDataGet[0].node.homeAcf

  return (
    <>
   <Metatags data={homePageData}/>
      <AOSInit />
   <Layout>
       {/* HERO START */}
       <section className="hero spacing-100 d-flex align-items-center text-white position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12" data-aos="fade-up">
              <h1 className='heading-primary mb-3' >{acf.bannerTitle}</h1>
              <p
              >{acf.bannerDescription}</p>
            </div>
          </div>
        </div>
        <Images
          imageurl={acf.bannerImage.node.sourceUrl}
          styles={''}
          quality={80}
          width={1500}
          height={800}
          placeholder={true}
          alt={acf.bannerImage.node.altText}
          classes={''}
        />
      </section>
      {/* HERO END */}
      {/* ABOUT START */}
      <section className='cta parallax-banner fixed-bg h-half spacing-100 d-flex align-items-center justify-content-center text-center position-relative text-white' style={{ backgroundImage: `url('${acf.aboutBackground.node.sourceUrl}')` }}>
        <div className="content d-flex align-items-center justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <span className='heading-secondary mb-sm-3 mb-3 d-block' data-aos="fade-up" dangerouslySetInnerHTML={{ __html: acf.aboutHeading }} />
                <p className='mb-0' data-aos="fade-up" data-aos-delay={500}>{acf.aboutDescription}</p>
                <Link rel="nofollow" aria-label="Lifecare vengad link" data-aos="fade-up" data-aos-delay={500} href={'/specialties'} className='btn btn-outline p-3 px-4 text-uppercase mt-4'>{pageDataGet[0].node.homeAcf.button}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT END */}
      {/* MISSION START */}
      <section className="mission h-half d-flex align-items-center justify-content-center overflow-hidden position-relative">
        <div className="container spacing-150">
          <div className="row">
            <div className="col-xl-4">
              <Images
                imageurl={acf.missionAndVisionBanner.node.sourceUrl}
                styles={''}
                quality={80}
                width={500}
                height={500}
                placeholder={true}
                alt={acf.missionAndVisionBanner.node.altText}
                classes={'rounded-5 d-block w-100'}
              />
            </div>
            <div className="col-xl-5 offset-xl-1 d-flex align-items-center mt-5 mt-xl-0">
              <div>
                <span className='heading-tertiary mb-3 text-tertiary' dangerouslySetInnerHTML={{ __html: acf.missionHeading }} />
                <p
                  className='text-tertiary mt-3'

                >{acf.missionDescription}</p>
                <span className='heading-tertiary mt-5 mb-3 text-tertiary d-block' dangerouslySetInnerHTML={{ __html: acf.visionHeading }} />
                <p className='text-tertiary'

                >{acf.visionDescription} </p>
              </div>
            </div>
          </div>
        </div>
        <RoundAnimation />
      </section>
      {/* MISSION END */}
      {/* DOCTORS START */}
      <section className="doctors h-half d-flex align-items-center justify-content-center bg-light text-tertiary spacing-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <span className='heading-secondary'
                data-aos="fade-up" dangerouslySetInnerHTML={{ __html: acf.doctorsHeading }} />
              <p className='mt-4' data-aos="fade-up" data-aos-delay={500}>{acf.doctorsDescription} </p>
              <Link rel="nofollow" aria-label="Meet our doctors" href={'/doctors'} className='btn btn-secondary-outline p-3 px-4 text-uppercase mt-3'
                data-aos="fade-up" data-aos-delay={500}
              >Meet our Doctors</Link>
            </div>
            <div className="col-xl-4 d-flex align-items-center justify-content-center mt-5 mt-xl-0">
              <div className="px-xl-5">
                <Doctors list={doctorComponentData} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DOCTORS END */}
      {/* SPECIALITIES START */}
      <section className='specialities parallax-banner h-half spacing-100 d-flex align-items-center justify-content-center position-relative text-white fixed-bg' style={{ backgroundImage: `url('${acf.specialtiesImage.node.sourceUrl}')` }}>
        <div className="content d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <span className='heading-secondary mb-sm-4 mb-4 d-block' dangerouslySetInnerHTML={{ __html: acf.specialititiesHeading }} />
              </div>
              <div className="col-xl-6">
                <div dangerouslySetInnerHTML={{ __html: acf.specialititiesDescription }} />
                <Link rel="nofollow" aria-label="Lifecare link" href={'/specialties'} className='btn btn-outline p-3 px-4 text-uppercase mt-4'>Specialties</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SPECIALITIES END */}
      {/* CTA BOTTOM START */}
      <section className='cta parallax-banner fixed-bg h-half spacing-100 d-flex align-items-center justify-content-center text-center position-relative text-white' style={{ backgroundImage: `url('${acf.aboutBackground.node.sourceUrl}')` }}>
        <div className="content d-flex align-items-center justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <span className='heading-secondary mb-sm-3 mb-3 d-block' data-aos="fade-up" dangerouslySetInnerHTML={{ __html: acf.ctaHeading }} />
                <p className='mb-0' data-aos="fade-up" data-aos-delay={500}>{acf.ctaDescription}</p>
                <Link rel="nofollow" aria-label="Lifecare vengad link" data-aos="fade-up" data-aos-delay={500} href={'/specialties'} className='btn btn-outline p-3 px-4 text-uppercase mt-4'>{acf.ctaButton}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA BOTTOM END */}
   </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    // HOME PAGE DATA
    const homeDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          pages(where: {title: "home"}) {
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
            }
            edges {
              node {
                id
                homeAcf {
                  aboutDescription
                  aboutBackground {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                  aboutHeading
                  bannerDescription
                  bannerImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                  bannerTitle
                  button
                  buttonLabel
                  ctaButton
                  ctaDescription
                  ctaHeading
                  doctorsDescription
                  doctorsHeading
                  fieldGroupName
                  missionAndVisionBanner {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                  missionDescription
                  missionHeading
                  specialititiesDescription
                  specialititiesHeading
                  specialtiesImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                  visionDescription
                  visionHeading
                }
              }
            }
          }
        }`,
      }),
    });

    const homePageData = await homeDataResponse.json();

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
              title
              categories {
                edges {
                  node {
                    termTaxonomyId
                    description
                  }
                }
              }
              featuredImage {
                node {
                  mediaDetails {
                    height
                    width
                  }
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

    // ALL POSTS DATA
    const postsDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          posts {
            nodes {
              title
              link
              slug
              modified
              author {
                node {
                  name
                  databaseId
                }
              }
            }
          }
        }`,
      }),
    });

    const allPostsData = await postsDataResponse.json();

    return {
      props: {
        homePageData,
        doctorComponentData,
        allPostsData,
      },
      revalidate: 10, // Revalidate every 10 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Display a 404 page if an error occurs
    };
  }
}


