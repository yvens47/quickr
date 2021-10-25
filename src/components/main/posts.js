import React, { Fragment } from "react";
import Post from "./post";
import { Skeleton } from "@material-ui/core";
import PostSkeleton from "./postSkeleton";
const Posts = ({
  posts,
  like,
  comment,
  commentTextChange,
  commentText,
  user,
  deleteUserPost
}) => {
  return (
    <Fragment>
      {!posts && [1, 2, 3, 4, 5].map(value => <PostSkeleton />)}

      {posts &&
        posts.map(post => (
          <Post
            deleteUserPost={deleteUserPost}
            user={user}
            commentText={commentText}
            commentTextChange={commentTextChange}
            comment={comment}
            like={like}
            post={post}
            key={post.id}
          />
        ))}
    </Fragment>
  );
};

export default Posts;
