import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import Comments from "./comments";
import { Avatar } from "@material-ui/core";
// import Stack from "@material-ui/core/Stack";
import { useState } from "react";
import TimeAgo from "react-timeago";

const Post = ({ post, like }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = e => {
    e.currentTarget.play();
    setIsPlaying(true);
  };
  const handleStop = e => {
    e.currentTarget.pause();
    setIsPlaying(false);
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

          {post.postType === "video" && (
            <video
              controls
              muted
              onMouseLeave={handleStop}
              onMouseEnter={handlePlay}
              preload="metadata"
              width="100%"
            >
              <source src={post.video} type="video/webm" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          )}
          {post.postType === "photo" && (
            <div
              className="post-photo-wrapper"
              style={{ position: "relative" }}
            >
              <div className="post-photo" style={{}}>
                <img
                  src={post.image}
                  alt={post.description}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}

          <div className="comments-wrapper-button  d-flex justify-content-between mt-2 pb-2 border-bottom">
            <div class="btn btn-light mt-1  ">
              <IconButton
                onClick={() => like(post.postId)}
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <ThumbUpOutlinedIcon />
              </IconButton>
              {post.likes}
            </div>
            <div>
              <div class=" btn btn-light mt-1   rounded-0   ">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <CommentIcon />
                </IconButton>
                {post.comments.length}
              </div>

              <div class=" btn btn-light mt-1   rounded-0   ">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <ShareIcon />
                </IconButton>
              </div>

              <div class=" btn btn-light mt-1   rounded-0    ">
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

          <div className="comments py-2">
            <div className="comments-info d-flex justify-content-between">
              <div></div>
              <div>
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
              </div>
            </div>
            <Comments comments={post.comments} />
            {/* {post.comments.map(comment => (
           ))} */}
          </div>
        </div>
        {/* <div className="card-footer text-muted">2 days ago</div> */}
      </div>
    </div>
  );
};

export default Post;
