import { Fragment } from "react";

import Post from "./post";
const Posts = ({ posts, like }) => {
  return (
    <Fragment>
      {posts && posts.map(post => <Post like={like} post={post} />)}
    </Fragment>
  );
};

export default Posts;
