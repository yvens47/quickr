import { Fragment } from "react";

import Post from "./post";
const Posts = ({ posts }) => {
  return (
    <Fragment>
      {posts.map(post => (
        <Post post={post} />
      ))}
    </Fragment>
  );
};

export default Posts;
