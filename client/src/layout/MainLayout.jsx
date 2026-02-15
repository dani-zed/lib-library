import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => (
  <>
    <Navbar />
    <main style={{ minHeight: "80vh", padding: "20px" }}>
      <Outlet /> {/* renders child routes */}
    </main>
    <Footer />
  </>
);

export default MainLayout;