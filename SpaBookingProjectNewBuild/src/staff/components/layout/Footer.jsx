import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-overlay-theme-10">
      <div className="min-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <h5>Contact Information</h5>
              <div className="footer-contact-info">
                <ul className="list-unstyled mb-0">
                  <li>
                    <i className="fas fa-fw fa-map-marker-alt text-primary"></i>
                    <span>6580 Allison Turnpike Creminfort, AL 32808-4509</span>
                  </li>
                  <li>
                    <i className="fas fa-fw fa-phone text-primary"></i>
                    <span>(123) 345-6789</span>
                  </li>
                  <li>
                    <i className="far fa-fw fa-envelope text-primary"></i>
                    <span>support@luxuryspa.com</span>
                  </li>
                </ul>
              </div>
              <div className="social-icon mt-4">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mt-4 mt-md-0 pl-lg-5">
              <div className="footer-link">
                <h5>Navigation</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="/about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/service">Service</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/team">Team</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
              <div className="footer-link">
                <h5>Useful Links</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
              <h5>Newsletter</h5>
              <div className="footer-subscribe">
                <p className="mb-3">
                  Sign Up to our Newsletter to get the latest news and offers.
                </p>
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Get Notified
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center copyright text-md-start text-center">
            <div className="col-12 col-md-6">
              <p className="mb-0 text-dark">
                &copy; Copyright {new Date().getFullYear()}
                <Link to="/"> LuxurySpa </Link> All Rights Reserved
              </p>
            </div>
            <div className="col-12 col-md-6 text-md-end text-center mt-3 mt-md-0">
              <p>
                Develop and design by <a href="#">Potenza Global Solutions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
