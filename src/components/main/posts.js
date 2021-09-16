import { Fragment } from "react";
import Post from "./post";
import { Skeleton } from "@material-ui/core";
import PostSkeletonCard from "./postSkeleton";
const Posts = ({ posts, like, comment, commentTextChange, commentText }) => {
  return (
    <Fragment>
      {posts &&
        posts.map(post => (
          <Post
            commentText={commentText}
            commentTextChange={commentTextChange}
            comment={comment}
            like={like}
            post={post}
          />
        ))}
    </Fragment>
  );
};

export default Posts;
