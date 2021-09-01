import { IconButton } from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
const Sidebar = props => {
  return (
    <div className="sidebar-main d-flex flex-column">
      <div className="sidebar-profile position-relative ">
        <div className="profile position-relative top-0 start-0 ">
          <img
            className="border  position-absolute top-0 start-0 rounded"
            src={props.profilePic}
            style={{ width: "100%", height: "100%;" }}
          />
          <div className="edit-icon position-absolute">
            <IconButton color="secondary">
              <EditIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
      <div>Sidebar content here</div>
    </div>
  );
};

export default Sidebar;
