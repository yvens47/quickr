import { Component, Fragment, createRef } from "react";
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
  addComment
} from "../../store/actions/index";
import { serverTimestamp } from "firebase/firestore";
import Sidebar from "./sidebar";
import BottomNavbar from "./bottomNav";

class AppIndexPage extends Component {
  state = {
    open: false,
    type: "text",
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
      comments: [],
      date: serverTimestamp()
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
    this.props.getPosts(0, 10);
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
  comment = e => {
    e.preventDefault();
    // add to db
    this.props.addComment(e.currentTarget.getAttribute("data-id"));
  };
  post = () => {
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
  render() {
    if (!this.props.loggedIn) {
      // Redirect
      <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <Header loggedIn={this.props.loggedIn} logout={this.props.logOut} />
        <div className="container-fluid" onScroll={() => alert("scrolled")}>
          <div className="row py-5   border-bottom justify-content-center p-2 ">
            <div className="col-md-3">
              <Sidebar
                display={this.props.user && this.props.user.displayName}
                profilePic={
                  "https://images.pexels.com/photos/9226524/pexels-photo-9226524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
              />
            </div>
            {/* Main content */}
            <div className="col-md-6 app-contents">
              <div className=" post-media-content-wrapper border   p-3 d-flex flex-column rounded">
                <div className="mb-3 d-flex ">
                  <span className="align-self-center mr-2">
                    <img
                      src="https://github.com/mdo.png"
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle mr-2"
                    />
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
                      data-type="Feeling"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={this.handleClickOpen}
                      style={{ border: "none" }}
                      className="rounded-pill mood mt-1 tn btn-light mt-1 flex-fill"
                      variant="outlined"
                      startIcon={<MoodIcon />}
                    >
                      Feeling
                    </Button>
                  </div>
                </div>
              </div>
              <Posts
                comment={this.comment}
                like={this.like}
                posts={this.props.posts}
              />
            </div>
            {/* maain content ends here */}

            {/* right side bar */}
            <div className="col-md-3">
              <h2 className="border p-2">Most Followed</h2>
            </div>
            {/* right sidebar ends here */}
          </div>
        </div>

        <Dialog type={this.state.type}>
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

        <Footer />
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.user,
    posts: state.posts.posts
  };
}
export default connect(mapStateToProps, {
  isLoggedIn,
  getPosts,
  addPost,
  likePost,
  addComment,
  logOut
})(AppIndexPage);
