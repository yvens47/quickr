import { Fragment } from "react";
import Comment from "./comment";
const Comments = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
    </Fragment>
  );
};

export default Comments;
