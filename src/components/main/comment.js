import { useState } from "react";
import TimeAgo from "react-timeago";
import UserHeaderInfo from "./user-header";
import TextField from "@material-ui/core/TextField";
const Comment = ({ comment }) => {
  const [replyBoxShow, setReplyBoxShow] = useState(false);
  const [text, setText] = useState("");
  const toggleReplyBox = () => {
    if (replyBoxShow) {
      setReplyBoxShow(false);
    } else {
      setReplyBoxShow(true);
    }
  };

  const handleCommentReply = comment => {

    
  };

  return (
    <div className="d-flex mt-2">
      <UserHeaderInfo
        name={comment.displayName}
        image={comment.image}
        date={comment.date}
      />

      <div className="flex-grow-1 ms-3   rounded-3">
        <div className=" bg-light p-3 rounded-3 ">{comment.text}</div>
        <div className="comments-likes d-flex">
          <span
            className="btn-link link-dark text-decoration-none"
            onClick={() => alert("likes comment")}
          >
            Likes
          </span>
          <span
            className="btn-link ml-1 link-dark text-decoration-none"
            onClick={toggleReplyBox}
          >
            Reply
          </span>
        </div>

        {/* show & Hide reply box */}
        {replyBoxShow && (
          <div className="likes-texbox-wrap">
            <form onSubmit={handleCommentReply}>
              <TextField
                fullWidth={true}
                name="reply"
                multiline
                onChange={e => {
                  setText(e.currentTarget.value);
                }}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
