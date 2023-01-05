import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import nav from "./nav";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  function compare(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }
  const [menu, showMenu] = useState(false);
  return (
    <>
      <Navbar key={false} expand={false} className="myHeader mb-3">
        <Container fluid>
          <Navbar.Brand href="#">
            ARHEX IBM
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => showMenu(true)}
            aria-controls={`offcanvasNavbar-false-${false}`}
          >
            <i className="fa fa-bars myLight"></i>
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-false-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-false-${false}`}
            placement="end"
            show={menu}
          >
            <Offcanvas.Header onHide={() => showMenu(false)} closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-false-${false}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link
                  onClick={() => showMenu(false)}
                  className="sideLink"
                  to="/"
                >
                  Dashboard
                </Link>
                {nav.sort(compare).map((item, index) => (
                  <Link
                    onClick={() => showMenu(false)}
                    className="sideLink"
                    key={index}
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
