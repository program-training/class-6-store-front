import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: "4rem 2rem 6rem 2rem"
        }}
      >
        <div
          style={{
            minHeight: "83vh",
            backgroundColor: "white",
            width: "92%",
          }}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
