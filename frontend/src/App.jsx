import UserLayout from "./Layout/UserLayout"
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Products from "./Pages/Products"
import ProductDetails from "./Pages/ProductDetails"



function App() {


  return (
    <>
      <Routes>
        
        <Route path="/" element={<UserLayout />} >
        <Route index element={<Home />} />
        <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/shop" element={<Products/>}/>
         <Route path="/products/:id" element={<ProductDetails />} />


        
        
        
        
        </Route>
        

      </Routes>
    </>
  )
}

export default App
