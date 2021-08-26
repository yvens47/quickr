import { Component, Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
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

import DialogContent from "./dialogContent";
class AppIndexPage extends Component {
  state = {
    posts: data,
    open: false,
    type: "photo"
  };
  handleClickOpen = e => {
    console.log(e);
    this.setState({ open: true, type: e.target.getAttribute("data-type") });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <Header isLogin={this.props.isLogin} />
        <div className="container-fluid">
          <div className="row p-0   border-bottom justify-content-center p-5 ">
            <div className="container">
              <div className="row">
                <div className="col-md-3">sdgsdg</div>
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
                  <Posts posts={this.state.posts} />
                </div>
                <div className="col-md-3">
                  <h2 className="border p-2">Most Followed</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog type={this.state.type}>
          <DialogContent />
        </Dialog>

        <Footer />
      </Fragment>
    );
  }
}

export default AppIndexPage;
