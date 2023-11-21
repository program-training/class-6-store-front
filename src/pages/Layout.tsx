import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{
        display: 'flex', justifyContent: "center",
        backgroundColor: "whitesmoke"
      }}>
        <div
          style={{
            minHeight: "83vh",
            backgroundColor: "purple",
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
