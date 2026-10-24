import { Outlet } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import BottomLinks from "../../components/bottomLinks/BottomLinks";
import { MdCalendarMonth, MdLibraryBooks } from "react-icons/md";
import { BsBookmarkCheck } from "react-icons/bs";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
        <BottomLinks 
        route_1="/"
        route_2="/#events"
        route_3="/"
        route_4="/#booking"
        icon_1={<IoMdHome />}
        icon_2={<MdCalendarMonth />}
        icon_3={<MdLibraryBooks />}
        icon_4={<BsBookmarkCheck />}
      />
    </>
  );
}
