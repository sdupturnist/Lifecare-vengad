



import Navigation from "./Navigation";




export default function Header(logoData) {

  

  return (
    <>
      {/* <Nav url={logoUrl} logoalt={logoAlt} /> */}
   <Navigation logoInfo={logoData && logoData}/>
       </>
  )
}



