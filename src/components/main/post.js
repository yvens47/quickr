import React, { useState, Fragment } from "react";

// import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
// import VideoCameraBackIcon from "@material-ui/icons/VideoCameraBack";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
// import MoodIcon from "@material-ui/icons/Mood";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Comments from "./comments";
import { Avatar, Badge, TextField } from "@material-ui/core";
// import Stack from "@material-ui/core/Stack";
import TimeAgo from "react-timeago";
// import { Skeleton } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import UserHeaderInfo from "./user-header";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Post = ({
  post,
  like,
  comment,
  commentTextChange,
  commentText,
  history,
  user,
  deleteUserPost,
  bookmark
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommentHide, setIsCommentHide] = useState(true);
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  // const [filter, setFilter] = useState("All");
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

  // const filterComments = () => {
  //   // get filter action from data-id and passit to setFilter
  //   alert("filter not yet implemented");
  //   // setFilter("Most Recent");
  // };

  

  return (
    <div className="py-2" key={post.postId}>
      <div className="card rounded" style={{ background: "#14102f", color: "#f2f2f2" }}>
        <div className="card-body">
          <div className="post-header d-flex flex-column">
            <div className="post-header-user-details d-flex" style={{ borderBottom: " solid thin #2c2753 " }}>
              <div>
                <IconButton
                  onClick={() =>
                    history.push({
                      pathname: `/profile/${post.user.name}`,
                      state: { userid: `${post.user.id}` }
                    })
                  }
                >
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
              {post.user.id === user.uid && (
                <div className="postEditActions flex-grow-1 d-flex justify-content-end align-items-center">
                  <div className="dropdown">
                    <Button
                      style={{  borderColor: "#14102f", color:'#8559da'}}
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      ariaExpanded="false"
                      
                    >
                      <MoreVertIcon style={{ color: '#8559da' }} />
                    </Button>
                    <ul
                      style={{ borderColor: "#14102f", background: "#512da8", color: 'whitesmoke' }}
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to="/#">
                          Edit
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteUserPost(post.id, user.uid)}
                          className="dropdown-item"
                        >
                          delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {post.postType === "video" && (
            <Fragment>
              <h5 className="card-title post-head">{post.description}</h5>
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
            </Fragment>
          )}

          {post.postType === "photo" && (
            <Fragment>
              <h5 className="card-title post-head lead " style={{color:"whitesmoke"}}>{post.description}</h5>
              <div
                className="post-photo-wrapper"
                style={{ position: "relative" }}
              >
                <div className="post-photo d-flex" style={{}}>
                  {post.photos.map(photo => (
                    <img
                      key={post.description}
                      className="flex-sm-shrink-0 flex-md-shrink-1 p-1 m-1 rounded"
                      src={photo}
                      alt={post.description}
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        objectFit:"contain"

                      }}
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
                      (photoIndex + post.photos.length - 1) %
                      post.photos.length
                      ]
                    }
                    onCloseRequest={() => setLightBoxOpen(false)}
                    onMovePrevRequest={() =>
                      setPhotoIndex(
                        (photoIndex + post.photos.length - 1) %
                        post.photos.length
                      )
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex((photoIndex + 1) % post.photos.length)
                    }
                  />
                )}
              </div>
            </Fragment>
          )}
          {post.postType === "post" && (
            <div className="post-text" style={{ position: "relative" }}>
              <div className="post-photo d-flex px-2 py-2" style={{}}>
                <p class="lead">{post.description}</p>
              </div>
            </div>
          )}

          <div className="comments-wrapper-button  d-flex justify-content-between mt-2 pb-2 ">
            <div class="btn    ">
              <IconButton
                onClick={() => like(post.id)}
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <Badge badgeContent={post.likes.length} color="action">
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
                  data-type={post.postId}
                  onClick={showComment}
                >
                  <Badge badgeContent={post && post.comments && post.comments.length} color="action">
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
                  onClick={()=>bookmark(post)}
                >
                  <BookmarkIcon />
                </IconButton>
              </div>
            </div>
          </div>

          <div
            style={{ display: isCommentHide ? "none" : "block", color: "#f2f2f2" }}
            className="comments py-2"
          >
            <div className="comments-info d-flex justify-content-between">
              <div></div>
              <div>
                {/* comments filtering */}
                <div className="dropdown">
                  <Link
                    className="btn btn-link link-dark dropdown-toggle"
                    to="/"
                    
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span style={{ color: "whiteSmoke" }}>All Comments</span>
                  </Link>

                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/">
                        Top Comments
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Most recent
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        All comments
                      </Link>
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
                <form data-id={post.id} onSubmit={comment}>
                  <TextField
                    sx={{
                                       background: "#201c3c",
                                        border: "solid 1px #201c3c",
                                        color: "whitesmoke"
                      }}
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

export default withRouter(Post);
