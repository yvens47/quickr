import React, { Fragment, useState } from "react";
import Comment from "./comment";
const Comments = ({ comments, filter, commentTextChange }) => {
  const [slice, setSlice] = useState({ start: 0, end: 20 });
  // filter comments by [most liked,most replied to, all comments, top 5]

  return (
    <Fragment>
      {comments.slice(slice.start, slice.end).map(comment => (
        <Comment
          key={comment.uid}
          comment={comment}
          commentTextChange={commentTextChange}
        />
      ))}
    </Fragment>
  );
};

export default Comments;
