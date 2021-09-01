import { Component, Fragment } from "react";
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
  getPosts,
  addPost,
  likePost
} from "../../store/actions/index";
import { serverTimestamp } from "firebase/firestore";
import Sidebar from "./sidebar";

class AppIndexPage extends Component {
  state = {
    open: false,
    type: "photo",
    liked: false,
    userPost: {
      postType: "",
      video: "",
      description: "",

      user: {
        id: "123456",
        name: "Beeplet",
        image:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      },

      likes: 50,
      comments: [{ user: "678", text: "Wowo this is great" }],
      date: "08-21-2021"
    }
  };
  componentDidMount = async () => {
    this.props.isLoggedIn();
    this.props.getPosts(0, 10);
  };
  handleClickOpen = e => {
    this.setState({ open: true, type: e.target.getAttribute("data-type") });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = ({ currentTarget }) => {
    const postCopy = { ...this.state.userPost };
    postCopy[currentTarget.name] = currentTarget.value;
    alert(JSON.stringify(postCopy));
    this.setState({ userPost: postCopy });
  };

  like = id => {
    // user can only like once
    alert(id);
    this.props.likePost(id);
  };
  post = () => {
    // adding record
    this.props.addPost({
      postType: "video",
      video:
        "https://player.vimeo.com/external/592779648.hd.mp4?s=e8f0692d952d2a6ad55cb93a56100c20da492ed0&profile_id=175&oauth2_token_id=57447761",
      description: "what do you think about this",
      date: "08-22-2021",
      user: {
        id: "123456",
        name: "Beeplet",
        image:
          "https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
      },
      likes: 90,
      comments: [
        {
          user: "678",
          text: "Wowo this is great",
          username: "Craig"
        },
        {
          user: "6788",
          text: "Wowo this is great",
          username: "Peter"
        }
      ],
      date: serverTimestamp()
    });
  };
  render() {
    if (!this.props.loggedIn) {
      // Redirect
      <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <Header loggedIn={this.props.loggedIn} />
        <div className="container-fluid">
          <div className="row py-5   border-bottom justify-content-center p-2 ">
            <div className="col-md-3">
              {/* Sidebar */}
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
                      className="form-control-lg border-0"
                      placeholder="what's on your mind?"
                    />
                  </span>
                </div>
                <div className="post-media border-top">
                  <div className="post-media-items d-flex justify-content-between">
                    <Button
                      data-type="Video"
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
                      data-type="Photo"
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
              <Posts like={this.like} posts={this.props.posts} />
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
            change={this.handleChange}
            post={this.post}
            userPost={this.state.userPost}
          />
        </Dialog>

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
  likePost
})(AppIndexPage);
