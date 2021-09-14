import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MoodIcon from "@material-ui/icons/Mood";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const BottomNavbar = props => {
  //const [value, setValue] = React.useState("recents");
  return (
    <BottomNavigation showLabels={true} component={"div"}>
      <BottomNavigationAction
        label="Nearby"
        style={{ color: "green" }}
        value="nearby"
        icon={<MoodIcon style={{ color: "green" }} />}
      />
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};

export default BottomNavbar;
