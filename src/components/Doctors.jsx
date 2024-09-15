import Slider from "./Slider"

export default function Doctors(props) {
  return (
    <>
       <Slider controls={false} indicators={false} autoPlay={true} interval="2000" touch="true" data={props.list.data.doctors.nodes}/>
    </>
   
  )
}

