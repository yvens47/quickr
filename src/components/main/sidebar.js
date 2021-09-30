import { IconButton } from "@material-ui/core/";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

const Sidebar = props => {
  const handleChangeDisplay = ({ currentTarget }) => {
    if (currentTarget.files !== null) {
      for (const file of currentTarget.files) {
        console.log(URL.createObjectURL(file));
      }
    }
  };
  return (
    <div className="sidebar-main d-flex flex-column d-none d-md-block ">
      <div class="d-flex flex-column flex-shrink-0 p-2 bg-light">
        <div className="sidebar-profile position-relative ">
          <div className="profile position-relative top-0 start-0 ">
            <Link to="/profile">
              <img
                className="border  position-absolute top-0 start-0 rounded"
                src={props.profilePic}
                style={{ width: "100%", height: "100%;" }}
              />
            </Link>

            <div className="edit-icon position-absolute">
              <input
                onChange={handleChangeDisplay}
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
          </div>
          <div></div>
          <span class="fs-4">{" " + props.display}</span>
        </div>

        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        ></a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              <HomeIcon className={"mr-1"} />
              Home
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <DashboardIcon className={"mr-1"} />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <ImportContactsIcon className={"mr-1"} />
              Contacts
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <BookmarksIcon className={"mr-1"} />
              Bookmarks
            </a>
          </li>

          {/* <li>
            <a href="#" class="nav-link link-dark">
              Customers
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
