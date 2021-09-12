import TimeAgo from "react-timeago";
import UserHeaderInfo from "./user-header";

const Comment = ({ comment }) => {
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
          <span className="btn-link link-dark">Likes</span>
          <span className="btn-link ml-1 link-dark">Reply</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
