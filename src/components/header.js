import { Link } from "react-router-dom";

import { useEffect } from "react";
const Header = props => {
  return (
    <nav
      style={{ backgroundColor: "#8215953d" }}
      class={
        props.scrolled
          ? `navbar navbar-expand-lg navbar-dark fixed-top `
          : "navbar navbar-expand-lg navbar-light bg-light "
      }
    >
      <div className="container-fluid">
        <Link class="navbar-brand fw-bold " to="/" style={{ color: "#9c27b0" }}>
          Quickr
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav col-12 col-lg-auto me-lg-auto">
            {/* <li>
              <Link href="#" className="nav-link px-2 link-dark">
                Products
              </Link>
            </li> */}
          </ul>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control border rounded-0"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          {props.loggedIn ? (
            <div className="dropdown text-end">
              <Link
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-lg-end"
                aria-labelledby="dropdownUser1"
              >
                {/* <li>
                  <Link className="dropdown-item" href="#">
                    New project...
                  </Link>
                </li> */}
                <li>
                  <Link className="dropdown-item" to="#">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#" onClick={props.logout}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="nav  justify-content-end">
              <li>
                <Link to="/login" className="nav-link px-2 link-dark">
                  <i class="fas fa-sign-in-alt"></i> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link px-2 link-dark">
                  <i class="fas fa-user"></i> Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
