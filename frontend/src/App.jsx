import UserLayout from "./Layout/UserLayout"
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"



function App() {


  return (
    <>
      <Routes>
        
        <Route path="/" element={<UserLayout />} >
        <Route index element={<Home />} />

        
        
        
        
        </Route>
        

      </Routes>
    </>
  )
}

export default App
