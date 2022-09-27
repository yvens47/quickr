import React, { Component, Fragment, createRef } from "react";
import { Redirect } from "react-router-dom";

import "./main.css";
import VideoCameraBackIcon from "@material-ui/icons/VideoCameraBack";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MoodIcon from "@material-ui/icons/Mood";
import Button from "@material-ui/core/Button";
import AvatarGroup from "@material-ui/core/AvatarGroup";
import { data } from "../../Data/posts";
import Post from "./post";
import Posts from "./posts";
import { Avatar } from "@material-ui/core";
import Dialog from "./Dialog";
import Header from "../header";
import Footer from "../footer";
import DialogContent from "./dialogContent";
import { connect } from "react-redux";

import {
  isLoggedIn,
  logOut,
  getPosts,
  addPost,
  likePost,
  deleteUserPost,
  changeProfile,
  addComment,
  getProfile
} from "../../store/actions/index";

import Sidebar from "./sidebar";
import BottomNavbar from "./bottomNav";
import PeopleToFollow from "./toFollow";

class AppIndexPage extends Component {
  state = {
    open: false,
    type: "text",
    userComment: "",
    // liked: false,
    userPost: {
      file: null,
      postType: "",
      video: "",
      videos: [],
      image: "",
      photos: [],

      description: "",
      user: {
        id: "",
        name: "",
        image: "",
        email: ""
      },

      likes: [],
      comments: []
    },
    upload: [],
    selectedFile: false
  };
  constructor(props) {
    super(props);
    this.myref = createRef();
  }
  componentDidMount = async () => {
    this.props.isLoggedIn();
    if (this.props.loggedIn) {
      this.props.getPosts();
      this.props.getProfile(this.props.user.uid, this.props.user.displayName);
    }
  };
  handleClickOpen = e => {
    this.setState({
      open: true,
      type: e.target.getAttribute("data-type")
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = ({ currentTarget }) => {
    const postCopy = { ...this.state.userPost };
    postCopy[currentTarget.name] = currentTarget.value;

    this.setState({ userPost: postCopy });
    const srcs = [...this.state.upload];

    if (currentTarget.files !== null) {
      srcs.push(currentTarget.files);
      this.setState({ upload: srcs[0] });
    }
  };

  like = id => {
    // user can only like once
    const { displayName, email, photoURL, uid } = this.props.user;
    const user = { displayName, email, photoURL, uid };
    this.props.likePost(id, user);
  };

  commentTextChange = ({ currentTarget }) => {
    this.setState({ userComment: currentTarget.value });
  };

  handleChangeProfilePic = ({ currentTarget }) => {
    const user = this.props.user;
    if (currentTarget.files !== null) {
      for (const file of currentTarget.files) {
        this.props.changeProfile(user, file);
      }
      // this.props.getProfile(this.props.user.uid, this.props.user.displayName);
    }
  };

  comment = e => {
    e.preventDefault();
    // add to db
    const userComment = {
      displayName: this.props.user.displayName,
      text: this.state.userComment,

      uid: this.props.user.uid,
      image: this.props.user.photoURL,
      reply: [],
      likes: []
    };

    this.props.addComment(e.currentTarget.getAttribute("data-id"), userComment);
    this.setState({ userComment: "" });
  };
  post = e => {
    e.preventDefault();
    const user = {
      id: this.props.user.uid,
      name: this.props.user.displayName,
      image: this.props.user.photoURL,
      email: this.props.user.email
    };
    // post
    const postCopy = { ...this.state.userPost, user: user };
    this.props.addPost(postCopy, this.state.type, this.state.upload);
    // clear post  object
  };
  handlePostOption = e => {
    const postCopy = {
      ...this.state.userPost,
      postType: e.currentTarget.getAttribute("data-option")
    };
    this.setState({ userPost: postCopy });
  };
  // delete user posted post
  deleteUserPost = (postId, userId) => {
    this.props.deleteUserPost(postId, userId);
  };

  render() {
    if (!this.props.loggedIn) {
      // Redirect
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { referrer: "/home" }
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header
          user={this.props.user}
          loggedIn={this.props.loggedIn}
          logout={this.props.logout}
        />

        <div style={{ paddingTop: ' 80px' }} className="wrapAll">
          <div className="container-fluid">
            <div className="row py-3   border-bottom justify-content-center p-2 mb-5 ">
              <div className="col-md-3" style={{ color: "#fefefe" }}>
                <Sidebar
                  changeDisplay={this.handleChangeProfilePic}
                  display={this.props.user && this.props.user.displayName}
                  user={this.props.user && this.props.user}
                  profilePic={
                    this.props.profile &&
                    this.props.profile.user &&
                    this.props.profile.user.photoURL
                  }
                />
              </div>
              {/* Main content */}
              <div className="col-md-5 app-contents">
                <div
                  className=" post-media-content-wrapper    p-3 d-flex flex-column rounded
              
              "
                  style={{ background: "#14102f" }}
                >
                  <div className="mb-3 d-flex ">
                    <span className="align-self-center mr-2">
                      <Avatar src={this.props.user.photoURL} />
                    </span>
                    <span className="flex-grow-1 ml-2">
                      <input
                        onFocus={this.handleClickOpen}
                        data-type="post"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        className="form-control-lg border-0"
                        placeholder="what's on your mind?"
                      />
                    </span>
                  </div>
                  <div className="post-media border-top">
                    <div className="post-media-items d-flex justify-content-between">
                      <Button
                        color="secondary"
                        data-type="video"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        style={{
                          borderRadius: "10px",
                          border: "none"
                        }}
                        className="rounded-pill camera mt-1 tn btn-light mt-1 flex-fill"
                        variant="outlined"
                        startIcon={<VideoCameraBackIcon />}
                      >
                        Video
                      </Button>
                      <Button
                        color="secondary"
                        data-type="photo"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        style={{ borderRadius: "10px", border: "none" }}
                        className="rounded-pill photo mt-1 tn btn-light mt-1 flex-fill"
                        variant="outlined"
                        startIcon={<i class="fas fa-photo-video"></i>}
                      >
                        Photo
                      </Button>
                      <Button
                        color="secondary"
                        data-type="Feeling"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        style={{ border: "none" }}
                        className="rounded-pill mood mt-1 tn btn-light mt-1 flex-fill"
                        variant="outlined"
                        startIcon={<MoodIcon color="danger" />}
                      >
                        Feeling
                      </Button>
                    </div>
                  </div>
                </div>
                <Posts
                  deleteUserPost={this.deleteUserPost}
                  user={this.props.user}
                  commentText={this.state.userComment}
                  commentTextChange={this.commentTextChange}
                  comment={this.comment}
                  like={this.like}
                  posts={this.props.posts}
                />
              </div>
              {/* maain content ends here */}

              {/* right side bar */}

              <div className="col-md-3">
                <div className="position-relative">
                  <div
                    style={{ position: 'fixed', color: '#f3f3f3', fontWeight: '500', fontFamily: "Inter, sans-serif;" }}
                    className="sidebar-main d-flex flex-column d-none d-md-block ">
                    <div className="d-flex flex-column">
                      <div><h2 className=" p-2 fs-4">Trendings</h2></div>
                      <div>
                        <h2 className=" p-2 fs-4">People to follow</h2>
                        <div className="p-3">
                          <PeopleToFollow />
                        </div>


                      </div>

                    </div>

                  </div>
                </div>
              </div>
              {/* right sidebar ends here */}
            </div>
          </div>

          <Dialog type={this.state.type} title="Create Post">
            <DialogContent
              type={this.state.type}
              handlePostOption={this.handlePostOption}
              change={this.handleChange}
              post={this.post}
              userPost={this.state.userPost}
              selectedFile={this.state.selectedFile}
              upload={this.state.upload}
              user={this.props.user}
            />
          </Dialog>

          {/* display bottom nav on phone scree */}
          <div className="bottomNav mt-5">
            <BottomNavbar />
          </div>
        </div>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.user,
    posts: state.posts.posts,
    profile: state.profile
  };
}
export default connect(mapStateToProps, {
  isLoggedIn,
  getPosts,
  addPost,
  likePost,
  deleteUserPost,
  addComment,
  changeProfile,
  logOut,
  getProfile
})(AppIndexPage);
