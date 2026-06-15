import Herosection from "../Components/Herosection"
import WatchDetailSection from "../Components/WatchDetailSection"
import NewAdd from "../Components/NewAdd"
import { useEffect } from "react";


export default function Home(){
 
    useEffect(() => {
  window.scrollTo(0, 0);
}, []); // Empty dependency array means it runs once on mount

    return(
        <>
       <Herosection />

       <WatchDetailSection />
       <NewAdd />
       
        </>
       
    )
}