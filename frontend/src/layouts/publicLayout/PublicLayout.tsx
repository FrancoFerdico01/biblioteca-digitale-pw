import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
