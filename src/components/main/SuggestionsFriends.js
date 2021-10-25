import React from "react";
import Friend from "./Friend";
import { IconButton } from "@material-ui/core/";
import { Avatar } from "@material-ui/core";
import UndoIcon from "@material-ui/icons/Undo";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button } from "@mui/material";

import { useState, Fragment } from "react";

const SuggestionsFriends = ({ friends, friendRequests, user }) => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const handleChange = e => friend => {
    const acceptedFriendsCopy = [...acceptedFriends];
    acceptedFriendsCopy.push(e.currentTarget.value);
    setAcceptedFriends(acceptedFriendsCopy);
  };
  return (
    <Fragment>
      <ul className="list-group border-none">
        {friends &&
          friends.map(friend => (
            // friend
            <label>
              <input
                onChange={e => handleChange(friend)}
                type="checkbox"
                name="test"
                value={friend}
              />
              <li
                key={friend.uid}
                className="list-group-item d-flex shadow-sm justify-content-start align-items-center mb-2 mr-1"
              >
                <IconButton>
                  <Avatar
                    component="span"
                    src={friend.photoURL}
                    alt={friend.displayName}
                  />
                </IconButton>
                <div className="d-flex flex-column flex-grow-1 align-items-start">
                  <div className="d-flex align-items-baseline">
                    <Link
                      className="link-dark text-decoration-none"
                      to={`${friend.displayName}`}
                    >
                      {friend.displayName}
                    </Link>
                  </div>
                  <div>
                    <span className="color-info">
                      {" "}
                      {`${friend.friends.length} Friends`}
                    </span>
                  </div>
                </div>

                <div>
                  <IconButton onClick={() => friendRequests(user.uid, friend)}>
                    <PersonAddIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      alert(
                        "Unfriended... not yet implemented " + `${friend.uid}`
                      )
                    }
                  >
                    <UndoIcon />
                  </IconButton>

                  <IconButton color="secondary">
                    {" "}
                    <RemoveCircleIcon />
                  </IconButton>
                </div>
              </li>
            </label>
          ))}
      </ul>

      <Button>{acceptedFriends.length}</Button>
    </Fragment>
  );
};

export default SuggestionsFriends;
