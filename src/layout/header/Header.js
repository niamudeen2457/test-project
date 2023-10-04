import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { BsCart } from "react-icons/bs";

const Header = () => {
  const cart = useSelector((state) => state?.cart);
  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light" fixed="sticky">
      <Container>
        <Navbar.Brand href="#home">Ecommerce-Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="link">
              HOME
            </Link>
            <Link to="/cart" className="link" style={{ marginLeft: "10px" }}>
              CART {cart?.length === 0 ? "" : `(${cart.length})`}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
