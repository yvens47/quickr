
import React from 'react'
import { Skeleton } from "@material-ui/core";
import PostSkeleton from "./postSkeleton";
import { Avatar, Badge, TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core/";
import UndoIcon from "@material-ui/icons/Undo";
import { Link } from "react-router-dom";
const Friend = ({ friend }) => {
  return (
    <li className="list-group-item d-flex justify-content-start align-items-center mb-2 mr-1">
      <IconButton>
        <Avatar component="span" src={"username"} alt={friend.name} />
      </IconButton>
      <div className="d-flex flex-column flex-grow-1 align-items-start">
        <div className="d-flex align-items-baseline">
          <Link className="link-dark text-decoration-none" to="/view">
            {friend.name}
          </Link>
        </div>
        <div>Friends with</div>
      </div>

      <div>
        <IconButton
          color="primary"
          onClick={() => alert("Unfriended... not yet implemented")}
        >
          <UndoIcon />
        </IconButton>
      </div>
    </li>
  );
};

export default Friend;
