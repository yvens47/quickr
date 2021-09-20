import { Fragment } from "react";

import { Skeleton } from "@material-ui/core";
import PostSkeleton from "./postSkeleton";

import Friend from "./Friend";
const FriendLists = ({ friends }) => {
  return (
    <Fragment>
      <ul className="list-group border-none">
        {!friends && [1, 2, 3, 4, 5].map(value => <PostSkeleton />)}

        {friends && friends.map(friend => <Friend friend={friend} />)}
      </ul>
    </Fragment>
  );
};

export default FriendLists;
