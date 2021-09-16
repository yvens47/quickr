import { useState } from "react";

import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import VideoCameraBackIcon from "@material-ui/icons/VideoCameraBack";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MoodIcon from "@material-ui/icons/Mood";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Comments from "./comments";
import { Avatar, Badge, TextField } from "@material-ui/core";
// import Stack from "@material-ui/core/Stack";
import TimeAgo from "react-timeago";
import { Skeleton } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserHeaderInfo from "./user-header";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const PostSkeleton = ({}) => {
  return (
    <div className="py-2">
      <div className="card">
        <div className="card-body">
          <div className="post-header d-flex flex-column">
            <div className="post-header-user-details d-flex border-bottom">
              <div>
                <IconButton>
                  <Skeleton variant="circle" width={40} height={40} />
                </IconButton>
              </div>

              <div>
                <div className="fw-bold">
                  <Skeleton variant="text" width={140} />
                </div>

                <div>
                  <Skeleton variant="text" width={140} />
                </div>
              </div>
            </div>
          </div>

          <Skeleton variant="text" width={"100%"} height={200} />

          <div className="comments-wrapper-button  d-flex justify-content-between mt-2 pb-2 border-bottom">
            <div class="btn    ">
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <Badge badgeContent={3} color="action">
                  <ThumbUpOutlinedIcon />
                </Badge>
              </IconButton>
            </div>
            <div>
              <div class=" btn     rounded-0   ">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Badge badgeContent={6} color="action">
                    <CommentIcon />
                  </Badge>
                </IconButton>
              </div>

              <div class=" btn     rounded-0   ">
                <IconButton
                  color="secondary"
                  aria-label="upload picture"
                  component="span"
                >
                  <ShareIcon />
                </IconButton>
              </div>

              <div class=" btn     rounded-0    ">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <BookmarkIcon />
                </IconButton>
              </div>
            </div>
          </div>

          <div
            style={{ display: false ? "none" : "block" }}
            className="comments py-2"
          >
            <div className="comments-info d-flex justify-content-between">
              <div></div>
              <div>
                {/* comments filtering */}
                <div className="dropdown">
                  <a
                    className="btn btn-link link-dark dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All Comments
                  </a>

                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Top Comments
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Most recent
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        All comments
                      </a>
                    </li>
                  </ul>
                </div>
                {/* comments filtering */}
              </div>
            </div>

            <div className="post-media-items d-flex justify-content-between mt-3">
              <div>
                <UserHeaderInfo name={"Jp"} />
              </div>
            </div>
            {/* display all comments */}
          </div>
        </div>
        {/* <div className="card-footer text-muted">2 days ago</div> */}
      </div>
    </div>
  );
};

export default PostSkeleton;
