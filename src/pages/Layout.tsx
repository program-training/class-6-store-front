import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"


const Layout = () => {
  return (
    <>
     <Header/>
     <div>
        <div></div>
        <Outlet/>
     </div>
     <Footer/>
    </>
  )
}

export default Layout
