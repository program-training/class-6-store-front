import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from '../components/Payment';

const Layout = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundImage: "url('https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg')",
          background: "rgb(227,230,230)",
          backgroundPosition: "fixed",
          backgroundSize: "cover",
          padding: "4rem 2rem 6rem 2rem"
        }}
      >
        <div
          style={{
            minHeight: "83vh",
            width: "92%",
          }}
        >
          {/* <Modal/> */}
          <Outlet/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
