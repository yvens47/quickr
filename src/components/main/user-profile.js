import React, { useEffect } from "react";
import Header from "../header";
import { Fragment } from "react";
import Footer from "../footer";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core/";

import EditIcon from "@material-ui/icons/Edit";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MailIcon from "@material-ui/icons/Mail";
import ListIcon from "@material-ui/icons/List";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Link, Redirect } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
// data
//import { user } from "../../Data/user.js";
import { connect } from "react-redux";
import {
  isLoggedIn,
  logOut,
  getPosts,
  addPost,
  likePost,
  addComment,
  suggestedFriends,
  friendRequest,
  getProfile
} from "../../store/actions/index";
import FriendLists from "./friendLists";
import SuggestionsFriends from "./SuggestionsFriends";
import Test from "./test";
import { ButtonBase, Button } from "@mui/material";
import Badge from "@material-ui/core/Badge";
import { Avatar } from "@material-ui/core";
import Dialog from "./Dialog";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const UserProfile = props => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (props.location.state && props.location.state.userid) {
      props.getProfile(props.location.state.userid, props.match.params.user);
      props.suggestedFriends(10, props.location.state.userid);
    } else {
      alert("hello wor;d");
      <Redirect to="/home" />;
    }

    // }
  }, []);
  const handleFriendsRequest = (currentUid, profile) => {
    props.friendRequest(profile, currentUid);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (!props.loggedIn) {
    // Redirect
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            referrer: `profile/${props.profile && props.profile.displayName}`
          }
        }}
      />
    );
  }

  return (
    <Fragment>
      <Header
        user={props.user}
        loggedIn={props.loggedIn}
        logout={props.logout}
      />
      <div className="coverpage  py-5 border-top ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5 border-1">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="profile-pic-wrap d-flex flex-column">
                      <div className="profile-pic  aligns-center position-relative">
                        <div className="position-relative">
                          <div className="profile position-relative top-0 start-0 ">
                            <div className="edit-icon position-absolute">
                              {props.profile &&
                                props.profile.uid === props.user.uid && (
                                  <IconButton
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    color="primary"
                                    component="div"
                                  >
                                    <PhotoCamera fontSize="large" />
                                  </IconButton>
                                )}
                            </div>

                            <Link
                              to={{
                                pathname: `/profile/${props.profile.displayName}`,
                                state: { userid: props.profile.uid }
                              }}
                            >
                              <img
                                className=""
                                style={{
                                  width: "100%",

                                }}
                                src={props.profile && props.profile.photoURL}
                                alt={props.user.bio}
                              />
                            </Link>

                            <div></div>
                          </div>
                          <div className="folow-friends border-top d-flex justify-content-center ">
                            <div className="followers p-2 aligns-center border-end fw-bold">
                              {`${props.profile &&
                                props.profile.followers.length} followers`}
                            </div>
                            <div className="friends p-2  fw-bold">
                              {`${props.profile &&
                                props.profile.friends.length} Friends`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="profile-name">
                        <p className="display-5 text-center ">
                          {props.profile && props.profile.displayName}
                        </p>
                      </div>
                      <div className="followme text-center">
                        {props.profile && props.profile.uid !== props.user.uid && (
                          <IconButton
                            color="secondary"
                            onClick={() =>
                              handleFriendsRequest(
                                props.user.uid,
                                props.profile
                              )
                            }
                          >
                            <PersonAddIcon />
                          </IconButton>
                        )}

                        <IconButton color="success">
                          <MailIcon />
                        </IconButton>
                        {props.profile && props.profile.uid === props.user.uid && (
                          <IconButton
                            color="success"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                          >
                            <Badge
                              badgeContent={
                                props.profile &&
                                props.profile.friendRequests &&
                                props.profile.friendRequests.length
                              }
                              color="error"
                            >
                              <NotificationsIcon />
                            </Badge>
                          </IconButton>
                        )}
                        {/* <span>Follow Me</span> */}
                      </div>
                      <div className="profile-about">
                        <p className="lead text-center ">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Mauris fermentum risus non odio efficitur
                          molestie.
                          <IconButton color="primary" component={"span"}>
                            <EditIcon />
                          </IconButton>
                        </p>
                        <p className="lead text-center "></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-2">
            <Box sx={{ width: "100%" }} component="div">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  centered
                  scrollButtons="on"
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    icon={<PhotoCamera />}
                    label="Photos"
                    {...a11yProps(0)}
                  />
                  <Tab
                    icon={<PeopleIcon />}
                    label="Friends"
                    {...a11yProps(1)}
                  />

                  <Tab
                    icon={<SettingsIcon />}
                    label="Settings"
                    {...a11yProps(2)}
                  />
                  <Tab
                    icon={<BookmarkIcon />}
                    label="Bookmarks"
                    {...a11yProps(3)}
                  />
                  <Tab icon={<ListIcon />} label="Posts" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0} componnet={"div"}>
                <div className="container-fluid">
                  <div className="myphoto-wrap row d-md-flex mt-2 ">
                    {props.profile &&
                      props.profile.photos &&
                      props.profile.photos.length == 0 && (
                        <div className="addPhoto">
                          <div className="row py-2 justify-content-start">
                            <div className="col-12 col-md-12">
                              <h1 className="display-3">No Photos yet </h1>
                              <p className="lead">Please Add Photo/Album</p>
                              <div>
                                <div className="addPhotoBtn"></div>
                                <div className="addPhotoBtn"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {props.profile &&
                      props.profile.photos &&
                      props.profile.photos.map(photo => (
                        <div className="my-photo  flex-shrink-1 border col-md-4 offset-0 p-0 ">
                          <img width="100%" height="100%" src={photo.url} />
                        </div>
                      ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="profile-friends">
                  <h1 className="display-5">
                    {props.profile &&
                      props.profile.friends &&
                      props.profile.friends.length == 0 &&
                      "Suggested Friends"}

                    {props.profile &&
                      props.profile.friends &&
                      props.profile.friends.length > 0 &&
                      `Your Friends ${props.profile.friends.length}`}
                  </h1>
                  <div className="friends-list">
                    {props.profile &&
                      props.profile.friends &&
                      props.profile.friends.length == 0 && (
                        <div className="row">
                          <SuggestionsFriends
                            friends={props.suggestions && props.suggestions}
                            user={props.user}
                            friendRequests={handleFriendsRequest}
                          />
                        </div>
                      )}

                    <FriendLists
                      friends={
                        props.profile &&
                        props.profile.friends &&
                        props.profile.friends
                      }
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div>
                  <h1 className="display-3">Your Account Settings</h1>
                </div>
              </TabPanel>

              <TabPanel value={value} index={3}>
                <div>
                  <h1 className="display-3">Your book marks</h1>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div>
                  <h1 className="display-3">{/* for now */}</h1>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
      {/* Dialog content */}
      <Dialog title="Upload/Choose photo">
        {/* photos */}
        <div className="d-flex flex-row justify-content-between flex-wrap">
          {props.profile.photos.map(photo => (
            <div key={photo.url} className="m-1" style={{ width: "200px" }}>
              <label>
                <input
                  onChange={e => alert("JSON.stringify(currentTarget.value)")}
                  type="radio"
                  name="test"
                  value={photo}
                  checked
                />
                <img src={photo.url} width="10%" />
              </label>
            </div>
          ))}
        </div>
      </Dialog>

      <Footer />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.user,
    posts: state.posts.posts,
    suggestions: state.user.suggestedFriends,
    profile: state.profile.user
  };
}
export default connect(mapStateToProps, {
  isLoggedIn,
  getPosts,
  suggestedFriends,
  getProfile,
  friendRequest
})(UserProfile);
