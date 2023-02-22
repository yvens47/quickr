import React from 'react'
import { Link } from "react-router-dom";

import { useEffect, Fragment } from "react";

import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar } from "@material-ui/core";
import icon from "../images/favicon.png"
import { Button } from '@mui/material';
const Header = props => {
  // const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return function cleanUp() {
      window.removeEventListener('scroll', handleScroll, true)

    }
  });

  const handleScroll = e => {

    // setScrolled(true);
  };

  return (
    <nav
      style={{ backgroundColor: "#14102f", color: "white" }}
      className={

        ` d-flex justify-content-end navbar navbar-expand-lg navbar-dark fixed-top  shadow`

      }
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold "
          to="/"
          style={{ color: "rgb(225, 223, 225)" }}
        >
          Quickr
          <img src={icon} style={{ width: "56px" }} alt='' />
        </Link>
       <Button
       disableRipple={true}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="navbar-collapse collapse justify-content-between" id="navbarSupportedContent" >
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              style={{ borderColor: "#201c3c", background: "#201c3c", boxShadow: "0 0 0 0.25rem #282249", color: "#eee" }}
              type="search"
              className="form-control  rounded-pill search"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
         
          <ul className="navbar-nav me-1 mb-2 mb-md-0">
          
            {props.loggedIn ? (
              <Fragment>
             
                <li class="nav-item dropdown">
                  <Link
                    href="#"
                    className="d-block link-dark text-decoration-none "
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <IconButton>
                      <Avatar src={props.user.photoURL} />
                    </IconButton>

                    {/* <img
                    src={props.user.photoURL}
                    alt={props.user.displayName}
                    width="32"
                    height="32"
                    className="rounded-circle"
                  /> */}
                  </Link>

                  <ul
                    className="dropdown-menu dropdown-menu-lg-end"
                    aria-labelledby="dropdownUser1"
                  >
                
                    <li>
                      <Link className="dropdown-item" to="#">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={{
                          pathname: `/profile/${props.user.displayName}`,
                          state: { userid: props.user.uid }
                        }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={props.logout}
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </li>
              
              </Fragment>
            ) : (
             <>
               <li className="nav-item">
             
                  <Link to="/login" className="nav-link px-2 ">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>
                  <li className="nav-item">
                  <Link to="/register" className="nav-link px-2 ">
                    <i className="fas fa-user"></i> Register
                  </Link>
                </li>
                </>
             
            )}
          
        
        </ul>
        </div>
       
      </div>
    </nav>
  );
};

export default Header;
