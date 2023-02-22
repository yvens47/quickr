import React, { useState } from "react";
// import TimeAgo from "react-timeago";
import UserHeaderInfo from "./user-header";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import TimeAgo from 'react-timeago'
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

  const handleCommentReply = comment => { };

  const likeComment = (commentId)=>{

  }

  return (
    <div className="d-flex mt-2 ">
      <UserHeaderInfo
        // name={comment.displayName}
        image={comment.image}
        // date={comment.date}
      />

      <div className="flex-grow-1 ms-3   rounded-3" >
        <div>{comment.displayName}
        <span className="small mx-1" style={{ color: "rgb(105, 105, 109)" }}> {<TimeAgo date={comment.date} />}</span>
        </div>
        <div  className="p-1 rounded-3 d-flex align-items-baseline ">{comment.text}</div>
        <div className="comments-likes d-flex" style={{ color: "#f3f3f3" }}>
          <span


          >
            <IconButton color={'primary'} onClick={() => likeComment()} >
              <FavoriteIcon />
            </IconButton>
          </span>
          <span

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
               style={{color:"whitesmoke"}}
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
