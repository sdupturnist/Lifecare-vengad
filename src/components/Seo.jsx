import Head from "next/head";

export default function Metatags(props){

    const seoData = props.data
    const seo = seoData.data.pages.nodes[0].seo
//console.log(seo)

    return(
        <>
          <Head>
     <>
     <title>{seo.title}</title>
     <meta name="description" content={seo.title.replace('admin.', '')}/>
     <meta property="og:title" content={seo.metaDesc.replace('admin.', '')}/>
     <meta property="og:description" content={seo.opengraphDescription.replace('admin.', '')}/>
     <meta property="og:url" content={seo.opengraphUrl.replace('admin.', '')}/>
     <meta property="og:locale" content="en_US"/>
     <meta property="og:image" content={seo.opengraphImage.sourceUrl.replace('admin.', '')}/>
     {/* <meta name="twitter:card" content={seo.title}/> */}
     {/* <meta name="twitter:title" content={seo.title}/> */}
     {/* <meta name="twitter:description" content={seo.title}/> */}
     {/* <meta name="twitter:image" content={seo.title}/> */}
     </>
        </Head>
        </>
    )
}