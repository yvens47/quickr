import { Avatar } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GroupsRoundedIcon from "@material-ui/icons/GroupsRounded";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
const DialogContent = props => {
  const [media, setMedia] = useState(false);

  return (
    <div className="container">
      <form onSubmit={props.post}>
        <div className="row">
          <div className="col-md-12">
            <div className="user-header d-flex">
              <div className="user-thumb">
                <IconButton color="secondary">
                  <Avatar
                    component="span"
                    src={props.user.photoURL}
                    alt={props.user.displayName}
                  />
                </IconButton>
              </div>
              <div className="user-head-details d-flex flex-column">
                <div>{props.user && props.user.displayName}</div>
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
            <div
              className="post_image-drag mb-2"
              style={{
                display: media ? "block" : "none",
                transition: "all 20ms"
              }}
            >
              <div className="image-drag  bg-light d-flex justify-content-center align-items-center mt-2">
                {props.selectedFile ? (
                  <div className="filePreview p-2 d-flex justify-content-start">
                    {props.upload.map(image => (
                      <img
                        className="flex-shrink-1"
                        src={image}
                        style={{ width: "20%" }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="inner-image-upload d-flex  ">
                    <div>
                      <IconButton
                        component={"span"}
                        onClick={() => setMedia(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>

                    <label for="formFile" className="form-label  py-3">
                      <CloudUploadIcon sx={{ fontSize: 40 }} />
                      <p>Upload {`${props.type}s`}</p>
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={props.change}
                      id="formFile"
                      name="file"
                      accept={props.type === "photo" ? "image/*" : "video/*"}
                      style={{ dispaly: "none" }}
                      multiple
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-12 ">
            <div className="col-md-12 d-flex flex-row  justify-content-between  align-items-center ">
              <div className="flex-fill fw-bold" style={{ padding: "5px" }}>
                Add to your post
              </div>
              <div
                style={{ padding: "0px" }}
                className="d-flex flex-grow-1 justify-content-end"
              >
                <div className="">
                  <IconButton
                    color="info"
                    data-option="photo"
                    onClick={() => setMedia(true)}
                  >
                    <PhotoLibraryIcon />
                  </IconButton>
                </div>
                <div className="">
                  <IconButton color="secondary">
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
      </form>
    </div>
  );
};

export default DialogContent;
