import UserLayout from "./Layout/UserLayout"
import { Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Products from "./Pages/Products"
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import PaymentSuccess from "./Pages/PaymentSuccess"
import Profile from "./Pages/Profile"
import MyOrders from "./Pages/MyOrders"
import About from "./Pages/About"






import AdminLayout from "./Layout/AdminLayout"
import AdminUsers from "./Pages/Admin/AdminiUsers"
import AdminDashBoard from "./Pages/Admin/AdminDashBoard"
import AdminProducts from "./Pages/Admin/AdminProducts"
import AdminAddProduct from "./Pages/Admin/AdminAddProduct"
import AdminOrder from "./Pages/Admin/AdminOrder"



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
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/payment-success" element={<PaymentSuccess />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/my-orders" element={<MyOrders />} />
         <Route path="/about" element={<About />} />



        
        
        
        
        </Route>


        <Route path="/admin" element={<AdminLayout />} >

          <Route index element={<AdminDashBoard />} />
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="products" element={<AdminProducts/>}/>
        <Route path="add-product" element={<AdminAddProduct/>}/>
        <Route path="orders" element={<AdminOrder/>}/>
        
      
        </Route>

        
        

      </Routes>
    </>
  )
}

export default App
