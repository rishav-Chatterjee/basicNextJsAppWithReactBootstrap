import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { Navbar, Container, Nav } from "react-bootstrap";

const index = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link href="/">
            <Navbar.Brand href="#home">Meeting WebApplications</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.navLeftAuto}>
              <Link href="/users">
                <a className={`text-dark ${styles.navBarLink}`}>Users</a>
              </Link>
              <Link href="/meetings">
                <a className={`text-dark ${styles.navBarLink}`}>My Meetings</a>
              </Link>
              <Link href="/recordings">
                <a className={`text-dark ${styles.navBarLink}`}>
                  Meeting Recordings
                </a>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default index;
