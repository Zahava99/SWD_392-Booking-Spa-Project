import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import LogoDark from "../../assets/images/logo-dark.svg";

const Header = () => {
  return (
    <header className="header header-sticky default">
      <nav className="navbar navbar-static-top navbar-expand-lg">
        <div className="container-fluid main-header position-relative">
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
          >
            <i className="fas fa-align-left"></i>
          </button>
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={Logo} alt="logo" />
            <img className="img-fluid sticky" src={LogoDark} alt="logo" />
          </Link>
          <div className="navbar-collapse collapse justify-content-end justify-content-lg-end">
            <ul className="nav navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link" to="/" data-bs-toggle="dropdown">
                  Home<i className="fa-solid fa-plus"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/">
                      <span>Home 01</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/home-2">
                      <span>Home 02</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/home-shop">
                      <span>Home shop</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">
                  <span>About us</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="add-listing">
            <a
              className="menu-btn"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <svg
                width="40"
                height="80"
                viewBox="0 0 80 80"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 60H33.3333"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M13.3333 40H53.3333"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M13.3333 20H66.6666"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <Link className="btn btn-primary" to="/appointment">
              Book Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
