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

const Post = ({ post, like, comment, commentTextChange, commentText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommentHide, setIsCommentHide] = useState(true);
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const handleOpenLightBox = () => {
    setLightBoxOpen(true);
  };
  const handlePlay = e => {
    e.currentTarget.play();
    setIsPlaying(true);
  };
  const handleStop = e => {
    e.currentTarget.pause();
    setIsPlaying(false);
  };
  const showComment = e => {
    e.preventDefault();
    if (isCommentHide) {
      setIsCommentHide(false);
    } else {
      setIsCommentHide(true);
    }
  };

  const filterComments = () => {
    // get filter action from data-id and passit to setFilter
    alert("filter not yet implemented");
    setFilter("Most Recent");
  };

  return (
    <div className="py-2" key={post.postId}>
      <div className="card">
        <div className="card-body">
          <div className="post-header d-flex flex-column">
            <div className="post-header-user-details d-flex border-bottom">
              <div>
                <IconButton>
                  <Avatar
                    component="span"
                    src={post.user.image}
                    alt={post.user.name}
                  />
                </IconButton>
              </div>

              <div>
                <div className="fw-bold">{post.user.name}</div>

                <div>
                  <TimeAgo date={post.date} />
                </div>
              </div>
            </div>
            <div className="py-3">
              <h5 className="card-title post-head">{post.description}</h5>
            </div>
          </div>

          {post ? (
            post.postType === "video" && (
              <video
                controls
                muted
                onMouseLeave={handleStop}
                onMouseEnter={handlePlay}
                preload="metadata"
                width="100%"
              >
                <source src={post.videos} type="video/mp4" />
                <source src={post.videos} type="video/webm" />
                Sorry, your browser doesn't support embedded videos.
              </video>
            )
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={250} />
          )}

          {post.postType === "photo" && (
            <div
              className="post-photo-wrapper"
              style={{ position: "relative" }}
            >
              <div className="post-photo d-flex" style={{}}>
                {post.photos.map(photo => (
                  <img
                    key={post.description}
                    className="flex-sm-shrink-0 flex-md-shrink-1 p-1 m-1"
                    src={photo}
                    alt={post.description}
                    style={{ width: "100%", cursor: "pointer" }}
                    onClick={handleOpenLightBox}
                  />
                ))}
              </div>
              {/* Light box */}
              {lightBoxOpen && (
                <Lightbox
                  enableZoom={false}
                  mainSrc={post.photos[photoIndex]}
                  nextSrc={post.photos[(photoIndex + 1) % post.photos.length]}
                  prevSrc={
                    post.photos[
                      (photoIndex + post.photos.length - 1) % post.photos.length
                    ]
                  }
                  onCloseRequest={() => setLightBoxOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + post.photos.length - 1) % post.photos.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % post.photos.length)
                  }
                />
              )}
            </div>
          )}
          {post.postType === "text" && (
            <div
              className="post-photo-wrapper"
              style={{ position: "relative" }}
            >
              <div className="post-photo d-flex" style={{}}>
                <p>{post.description}</p>
                ))}
              </div>
            </div>
          )}

          <div className="comments-wrapper-button  d-flex justify-content-between mt-2 pb-2 border-bottom">
            <div class="btn    ">
              <IconButton
                onClick={() => like(post.postId)}
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <Badge badgeContent={post.likes.length} color="action">
                  <ThumbUpOutlinedIcon />
                </Badge>
              </IconButton>
              {/* <span class="social-details d-none d-md-inline">
                {post.likes.length > 1
                  ? `${post.likes.length} likes`
                  : `${post.likes.length} like`}
              </span> */}
            </div>
            <div>
              <div class=" btn     rounded-0   ">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  data-type={post.postId}
                  onClick={showComment}
                >
                  <Badge badgeContent={post.comments.length} color="action">
                    <CommentIcon />
                  </Badge>
                </IconButton>
                {/* <span class="social-details d-none d-md-inline">
                  {post.likes.length > 1
                    ? `${post.comments.length} comment`
                    : `${post.comments.length} comments`}
                 
                </span> */}
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
            style={{ display: isCommentHide ? "none" : "block" }}
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
              <div className="flex-grow-1">
                {/* comments form */}
                <form data-id={post.postId} onSubmit={comment}>
                  <TextField
                    onChange={commentTextChange}
                    placeholder="add your comment"
                    fullWidth={true}
                    multiLine={true}
                    value={commentText}
                  />
                </form>
                {/* comments form ends here */}
              </div>
            </div>
            {/* display all comments */}
            <Comments comments={post.comments} filter={"Most Recent"} />
          </div>
        </div>
        {/* <div className="card-footer text-muted">2 days ago</div> */}
      </div>
    </div>
  );
};

export default Post;
