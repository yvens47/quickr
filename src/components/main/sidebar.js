import { IconButton } from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Link } from "react-router-dom";
const Sidebar = props => {
  return (
    <div className="sidebar-main d-flex flex-column">
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
              <IconButton color="secondary">
                <EditIcon fontSize="large" />
              </IconButton>
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
              <HomeIcon />
              Home
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <DashboardIcon />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <ImportContactsIcon />
              Orders
            </a>
          </li>

          <li>
            <a href="#" class="nav-link link-dark">
              Customers
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
