import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import AOSInit from "@/components/Aos";
import Images from "@/components/Images";
import SectionBanner from "@/components/SectionBanner";
import Metatags from "@/components/Seo";
import Link from "next/link";




export default function SepecialitiesPage({ specialtiesPageData, departmentComponentData, fecilitiesComponentData }) {


    // console.log(fecilitiesComponentData.data.allFecilities.nodes)

    // Render your page content using the data
    return (
        <>
            <Metatags data={specialtiesPageData} />
            <AOSInit />
            <Layout>
                <AOSInit />
                {/* PAGE TITLE START */}
                <div
                    style={{ background: `url(${specialtiesPageData.data.pages.nodes[0].featuredImage.node.sourceUrl})` }}
                    className="parallax-banner page-header aspect-[2/1] spacing-100 d-flex align-items-center justify-content-center text-center position-relative text-white"
                >
                    <section className='cta'>
                        <div className="content d-flex align-items-center justify-content-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <h1 className='heading-secondary mb-sm-4 mb-2'>{specialtiesPageData.data.pages.nodes[0].title}</h1>
                                        <p className='mb-0 mt-sm-4 mt-2'>{specialtiesPageData.data.pages.nodes[0].pageACF.subHeading}</p>
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
                                <p className="text-normal" data-aos="fade-up" data-aos-delay={500} dangerouslySetInnerHTML={{ __html: specialtiesPageData.data.pages.nodes[0].pageACF.about }} />
                                <hr className='mt-5 border-1' />
                            </div>
                        </div>
                    </div>
                </section>
                {/* ABOUT SECTION END */}
                <div>
                    {/* <DepartmentList /> */}
                    <section data-aos="fade-up">
                        <div className="container">
                            {departmentComponentData.data.allDepartments.nodes.map((department, key) => {
                                return <div className="row spacing-100 pt-0" key={key} >
                                    <div className="col-xl-5 mb-3 mb-xl-0">
                                        <Images
                                            imageurl={department.featuredImage.node.sourceUrl}
                                            styles={''}
                                            quality={80}
                                            width={500}
                                            height={500}
                                            alt={department.featuredImage.node.altText}
                                            classes={'w-100 d-block rounded-4'}
                                        />
                                    </div>
                                    <div className="col-xl-7 d-flex align-items-center justify-content-center">
                                        <div className="ps-xl-5">
                                            <h2 className='heading-secondary text-tertiary mb-3'>{department.title}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: department.content }} />
                                            <Link rel="nofollow" aria-label="Doctors" className='mt-3 btn btn-outline-primary  px-4 py-3 rounded-1 text-uppercase' href={'/doctors#' + department.title.toLowerCase().split(' ').join('_')}>Doctors</Link>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </section>
                </div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <hr />
                                <h2 className='heading-secondary text-tertiary mt-5'>{specialtiesPageData.data.pages.nodes[0].pageACF.sectionHeading}</h2>
                                <p>{specialtiesPageData.data.pages.nodes[0].pageACF.sectionDescription}</p>
                            </div>
                        </div>
                    </div>
                    {/* <FeclitiesList /> */}
                    <section className='spacing-100 pt-0' data-aos="fade-up">
                        <div className="container">
                            <div className="row mt-sm-5 pt-4" >
                                {fecilitiesComponentData.data.allFecilities.nodes.map((fecili, key) => {
                                    return <div className="col-xl-6 mb-4" key={key} >
                                        <div className="box p-sm-4 p-3">
                                            <Images
                                                placeholder={true}
                                                imageurl={fecili.featuredImage.node.sourceUrl}
                                                styles={''}
                                                quality={80}
                                                width={500}
                                                height={500}
                                                alt={fecili.featuredImage.node.altText}
                                                classes={'w-100 d-block rounded-3'}
                                            />
                                            <h2 className='heading-tertiary text-tertiary mb-2'>{fecili.title}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: fecili.content }} />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </section>
                </div>
                {/* SPECIALITIES START */}
                <SectionBanner type="column" background={specialtiesPageData.data.pages.nodes[0].specialitiesACF.bottomBannerBackground.node.sourceUrl} heading={specialtiesPageData.data.pages.nodes[0].specialitiesACF.bottomBannerHeading} description={specialtiesPageData.data.pages.nodes[0].specialitiesACF.bottomBannerDescription} link={specialtiesPageData.data.pages.nodes[0].pageACF.ctaButtonUrl} button={specialtiesPageData.data.pages.nodes[0].pageACF.ctaButtonLabel} />
                {/* SPECIALITIES END */}
                <SectionBanner background={specialtiesPageData.data.pages.nodes[0].featuredImage.node.sourceUrl} heading={specialtiesPageData.data.pages.nodes[0].pageACF.ctaBannerHeading} description={specialtiesPageData.data.pages.nodes[0].pageACF.ctaBannerDescription} link={specialtiesPageData.data.pages.nodes[0].pageACF.ctaButtonUrl} button={specialtiesPageData.data.pages.nodes[0].pageACF.ctaButtonLabel} />

            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    try {

        //PAGE DATA
        const pageData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query Posts {
            pages(where: {id: 46}) {
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
                specialitiesACF{
                  bottomBannerHeading
                  bottomBannerDescription
                  bottomBannerBackground{
                    node{
                      altText
                      sourceUrl
                    }
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

        const specialtiesPageData = await pageData.json();



        //DEPARTMENT DATA
        const departmentData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query Posts {
            allDepartments {
              nodes {
                content
                title
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

        const departmentComponentData = await departmentData.json();


        //SERVICES DATA
        const fecilitiesData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query Posts {
            allFecilities {
              nodes {
                content
                title
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

        const fecilitiesComponentData = await fecilitiesData.json();



        return {
            props: {
                specialtiesPageData,
                departmentComponentData,
                fecilitiesComponentData
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            redirect: {
                destination: '/error',
                permanent: false,
            },
        };
    }
}