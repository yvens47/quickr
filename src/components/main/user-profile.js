import React from "react";
import Header from "../header";
import { Fragment } from "react";
import Footer from "../footer";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
import BackspaceIcon from "@material-ui/icons/Backspace";

import { Link } from "react-router-dom";
// data
import { user } from "../../Data/user.js";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const UserProfile = () => {
  const [value, setValue] = React.useState(0);
  console.log(user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Header isLogin={true} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 mt-5">
            <div className="profile-pic-wrap d-flex flex-column">
              <div className="profile-pic p-2 border">
                <img
                  className=""
                  style={{ width: "100%" }}
                  src={user.profile}
                  alt={user.bio}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-5">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Photos" {...a11yProps(0)} />
                  <Tab label="Friends" {...a11yProps(1)} />
                  <Tab label="Settings" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="myphoto-wrap d-flex ">
                  {user.photos.map(photo => (
                    <div className="my-photo p-2 m-1  flex-shrink-1 border ">
                      <img width="100%" src={photo.default} />
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="profile-friends">
                  <div className="friends-list">
                    <ul className="list-group">
                      {user.friends.map(friend => (
                        <li className="list-group-item d-flex justify-content-start align-items-center mb-2 mr-1">
                          <img
                            className="flex-shrink-1 m-2"
                            width="5%"
                            src={friend.profile}
                          />
                          <div className="d-flex flex-column flex-grow-1 align-items-start">
                            <div className="d-flex align-items-baseline">
                              <Link
                                className="link-dark text-decoration-none"
                                to="/view"
                              >
                                {friend.name}
                              </Link>
                            </div>
                            <div>Friends with</div>
                          </div>

                          <div>
                            <IconButton color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton color="secondary">
                              <BackspaceIcon />
                            </IconButton>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div>
                  <h1>Your Account Settings</h1>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default UserProfile;
