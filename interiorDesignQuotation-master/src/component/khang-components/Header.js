import React, { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Searchbar } from "../../thi-cong/task-thuong/Searchbar";
export default function Header({ isLoggedIn, onLogout }) {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid home-page-header">
        <div className="Logo">
          <Link to="/" className="navbar-brand">
            <img src={logo} style={{ width: "100px", height: "auto"}}/>
          </Link>
        </div>

        <div
          class="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav mb-2 mb-lg-0 flex-wrap">
            <li class="nav-item mx-3">
              <Link to="/" className="nav-link active Header-text">
                Trang chủ
              </Link>
            </li>
            <li class="nav-item dropdown mx-3">
              <a
                class="nav-link dropdown-toggle Header-text"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dịch vụ Spa
              </a>
              <ul class="dropdown-menu">
                <li>
                  <Link
                    to="/Thiết_kế_nội_thất_chung_cư"
                    className="dropdown-item Header-text"
                  >
                    Test1
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Thiết_kế_nội_thất_nhà_phố"
                    className="dropdown-item Header-text"
                  >
                    Test2
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Thiết_kế_nội_thất_biệt_thự"
                    className="dropdown-item Header-text"
                  >
                    Test3
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Thiết_kế_nội_thất_văn_phòng"
                    className="dropdown-item Header-text"
                  >
                    Test4
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li class="nav-item dropdown mx-3">
              <a
                class="nav-link dropdown-toggle Header-text"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Đặt lịch
              </a>
              
              <ul class="dropdown-menu">
                <li>
                  <Link
                    to="/Tổng_quan"
                    className="dropdown-item Header-text"
                    href="#"
                  >
                    Tổng quan
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item Header-text"
                    to={"/Thi_Công_nội_thất_chung_cư"}
                  >
                    Chung Cư
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item Header-text"
                    to={"/Thi_Công_nội_thất_nhà_phố"}
                  >
                    Nhà Phố
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item Header-text"
                    to={"/Thi_Công_nội_thất_văn_phòng"}
                  >
                    Văn Phòng
                  </Link>
                </li>
                <li>
                <Link className='dropdown-item Header-text' to={'/Thi_Công_nội_thất_biệt_thự'}>
                    Biệt Thự
                  </Link>
                </li>
              </ul>
            </li> */}

            <li class="nav-item mx-3">
              <Link
                to="/Dự_án_đã_thi_công"
                class="nav-link active Header-text"
                href="#"
              >
                Blog
              </Link>
            </li>
            <li class="nav-item mx-3">
              <Link to="/Blog" class="nav-link active Header-text" href="#">
                Về chúng tôi
              </Link>
            </li>

            <li class="nav-item dropdown mx-3">
              <Link
                class="nav-link active Header-text"
                to="/Liên_Hệ"
                role="button"

              >
                Liên hệ
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item dropdown mx-3">
                <a
                  className="nav-link dropdown-toggle Header-text"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tài khoản
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/Customers_Request_Management" className="dropdown-item Header-text">
                      Hồ sơ
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={onLogout}
                      className="dropdown-item Header-text"
                      type="button"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item mx-3">
                <Link
                  to="/Đăng_nhập"
                  className="nav-link active Header-text"
                  href="#"
                >
                  Đăng nhập
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Searchbar/>
      </div>
    </nav>
  );
}
