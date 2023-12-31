import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import "./header.css";
import { type } from "@testing-library/user-event/dist/type";

const Header = () => {
  const { userId, userList, logout, currentUser } = useLocalStorage();
  const cart = useSelector((state) => state?.cart);
  console.log(userList, typeof userList);

  const route = useLocation()?.pathname;
  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light" sticky="top">
      <Container>
        <Navbar.Brand to="#home">Ecommerce-Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  flexCenter">
            <Link
              to="/"
              className={` pt-2 mx-2 ${route === "/" ? "active" : "link"}`}
            >
              HOME
            </Link>
            {userId === null || userList?.length === 0 ? (
              <Link
                to="/signup"
                className={` pt-2 mx-2 ${
                  route === "/signup" ? "active" : "link"
                }`}
              >
                SIGNUP
              </Link>
            ) : null}
            {userId === null || userList?.length === 0 ? (
              <Link
                to="/login"
                className={` pt-2 mx-2 ${
                  route === "/login" ? "active" : "link"
                }`}
              >
                LOGIN
              </Link>
            ) : null}
            {userId === null || userList?.length === 0 ? null : (
              <Link
                to="/cart"
                className={` pt-2 mx-2 ${
                  route === "/cart" || route.split("/")[1] === "product"
                    ? "active"
                    : "link"
                }`}
              >
                CART {cart?.length === 0 ? "" : `(${cart.length})`}
              </Link>
            )}
            {userId === null || userList?.length === 0 ? null : (
              <NavDropdown
                title={currentUser?.name?.toUpperCase()}
                id="basic-nav-dropdown"
                className="pt-2"
                style={{ fontSize: "15px" }}
              >
                <div className="flexFront mx-0 px-0">
                  <Link
                    to="/user"
                    className={` mb-2 pt-2 ${
                      route === "/user" ? "active" : "link"
                    }`}
                  >
                    <FaUserCircle className="mx-1" /> Profile
                  </Link>
                  <Link to="#" onClick={() => logout()} className="link">
                    <FiLogOut className="mx-1" /> Logout
                  </Link>{" "}
                </div>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
