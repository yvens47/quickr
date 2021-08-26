const Comment = ({ comment }) => {
  return (
    <div className="d-flex mt-2">
      <div className="flex-shrink-0">
        <img
          className="rounded-circle"
          style={{ width: "32px", height: "32px" }}
          src="https://github.com/mdo.png"
          alt="..."
        />
      </div>
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
