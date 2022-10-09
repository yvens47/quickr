import React from 'react';
import { IconButton } from "@material-ui/core/";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import AddAlertIcon from '@material-ui/icons/AddAlert';
import Button from "@material-ui/core/Button";

import { Link, NavLink } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Sidebar = props => {
  return (
    <div
      style={{ position: 'fixed' }}
      className="sidebar-main d-flex flex-column d-none d-md-block ">
      <div class="d-flex flex-column flex-shrink-0 p-2 " style={{ background: "#201c3c" }}>
        <div className="sidebar-profile  ">
          {/* <div className="profile position-relative top-0 start-0 ">
            <Link
              to={{
                pathname: `/profile/${props.display}`,
                state: { userid: props.user.uid }
              }}
            >
              {!props.profilePic ? (
                <Skeleton
                  className="border  position-absolute top-0 start-0 rounded"
                  style={{ width: "100%", height: "190px" }}
                />
              ) : (
                <img
                  className="rounded  position-absolute top-0 start-0 rounded"
                  src={props.profilePic}
                  style={{ width: "100%", height: "100%", padding: "10px" }}
                />
              )}
            </Link>

            <div className="edit-icon position-absolute">
              <input
                onChange={props.changeDisplay}
                style={{ display: "none" }}
                accept="image/*"
                id="contained-button-file"
                type="file"
              />

              <label htmlFor="contained-button-file">
                <IconButton color="primary" component="span">
                  <CameraAltIcon fontSize="large" />
                </IconButton>
              </label>
            </div>
          </div> */}
          <div></div>
          {/* <span class="fs-5 px-3">{" " + props.display}</span> */}
        </div>


        <ul class="nav nav-pills flex-column mb-auto">

          <li>
            <Link style={{ fontWeight: '500', fontFamily: "Inter, sans-serif;" }} to="/home" class="nav-link link-light fs-5 ">
              <MenuIcon className={"me-3 "} />
              Home
            </Link>
          </li>
          <li>
            <Link style={{ fontWeight: '500', fontFamily: "Inter, sans-serif;" }} to="/profile" class="nav-link link-light fs-5 ">
              <DashboardIcon className={"me-3"} />
              Profile
            </Link>
          </li>
          <li>
            <Link style={{ fontWeight: '500', fontFamily: "Inter, sans-serif;" }} to="/notifications" class="nav-link link-light fs-5 ">
              <AddAlertIcon className={"me-3"} />
              Alerts
            </Link>
          </li>
          <li>
            <Link style={{ fontWeight: '500', fontFamily: "Inter, sans-serif;" }} to="#" class="nav-link link-light fs-5 ">
              <BookmarksIcon className={"me-3"} />
              Settings
            </Link>
          </li>

          <li>

            <Button style={{ background: '#512da8' }} fullWidth className='rounded-pill mt-3' variant='contained'>
              <BookmarksIcon className={"me-2"} /> Compose

            </Button>
          </li>


        </ul>
      </div>
    </div >
  );
};

export default Sidebar;
