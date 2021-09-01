import { Avatar } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GroupsRoundedIcon from "@material-ui/icons/GroupsRounded";
import Button from "@material-ui/core/Button";
const DialogContent = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="user-header d-flex">
            <div className="user-thumb">
              <IconButton color="secondary">
                <Avatar
                  component="span"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="username"
                />
              </IconButton>
            </div>
            <div className="user-head-details d-flex flex-column">
              <div>Jean Yvens Pierre</div>
              <div>
                <div className="btn-group">
                  <Link
                    to="#"
                    className=" btn-link link-dark text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Public
                  </Link>
                  <ul className="dropdown dropdown-menu">
                    <li>
                      <h6 className="dropdown-header">Dropdown header</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 d-flex flex-column">
          {/*textbox post */}
          <div className="">
            <input
              name="description"
              onChange={props.change}
              className="form-control-lg border-0 col-12"
              placeholder="what's on your mind?"
            />
          </div>
          <div className="post_image-drag mb-2">
            <div className="image-drag border bordrer-1 bg-light d-flex justify-content-center align-items-center mt-2">
              <div className="inner-image-upload d-flex  ">
                <label for="formFile" className="form-label border py-3">
                  <CloudUploadIcon sx={{ fontSize: 40 }} />
                  <p>Upload Photos /Videos</p>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  style={{ dispaly: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 ">
          <div className="col-md-12 d-flex flex-row  justify-content-between border align-items-center">
            <div className="flex-fill fw-bold" style={{ padding: "5px" }}>
              Add to your post
            </div>
            <div
              style={{ padding: "0px" }}
              className="d-flex flex-grow-1 justify-content-end"
            >
              <div className="">
                <IconButton color="secondary">
                  <PhotoLibraryIcon />
                </IconButton>
              </div>
              <div className="">
                <IconButton color="primary">
                  <EmojiEmotionsIcon />
                </IconButton>
              </div>
              <div className="">
                <IconButton>
                  <GroupsRoundedIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="mt-1">
            <Button
              onClick={props.post}
              color="secondary"
              fullWidth={true}
              variant="contained"
              data-bs-dismiss="modal"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogContent;
