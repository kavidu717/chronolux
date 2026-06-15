 import Header from "../Common/Header"
 import {Outlet} from "react-router-dom"
 import Footer from "../Common/Footer" 
 import Chatbot from "../Pages/ChatBot"

export default function UserLayout() {
    return (
        <>
         <Header/>
            <Outlet/>
<Chatbot />
          <Footer/>
        </>
    )
}