import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MoodIcon from "@material-ui/icons/Mood";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const BottomNavbar = props => {
  //const [value, setValue] = React.useState("recents");
  return (
    <BottomNavigation showLabels={true} component={"div"} style={{ background: "#201c3c" }}>
      <BottomNavigationAction
        label="Nearby"
        style={{ color: "white" }}
        value="nearby"
        icon={<MoodIcon style={{ color: "#512da8" }} />}
      />
      <BottomNavigationAction style={{ color: "white" }} label="Recents" icon={<RestoreIcon style={{ color: "#512da8" }} />} />
      <BottomNavigationAction style={{ color: "white" }} label="Favorites" icon={<FavoriteIcon style={{ color: "#512da8" }} />} />
      <BottomNavigationAction style={{ color: "white" }} label="Nearby" icon={<LocationOnIcon style={{ color: "#512da8" }} />} />
    </BottomNavigation>
  );
};

export default BottomNavbar;
