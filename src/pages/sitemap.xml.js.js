import { frontendUrl, wordpressUrl } from "@/utils/variables";
const EXTERNAL_DATA_URL = `${wordpressUrl}/wp-json/wp/v2/posts`


function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
     <loc>${frontendUrl}</loc>
   </url>
     <url>
       <loc>${frontendUrl}/blogs</loc>
     </url>
     <url>
     <loc>${frontendUrl}/appointment</loc>
   </url>
   <url>
   <loc>${frontendUrl}/specialties</loc>
 </url>
 <url>
 <loc>${frontendUrl}/doctors</loc>
</url>
    ${posts
      .map(({ link }) => {
        return `
       <url>
           <loc>${`${frontendUrl}${link.substring(link.indexOf("/blogs")).slice(0, -1)}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;