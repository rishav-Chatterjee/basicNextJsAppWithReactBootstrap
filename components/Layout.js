import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}

export default Layout;
