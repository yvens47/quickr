import React from 'react';
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TimeAgo from "react-timeago";
function UserHeaderInfo({ image, name, date }) {
  return (
    <div
     
     className="post-header-user-details d-flex align-items-start  ">
      <div>
        <IconButton>
          <Avatar component="span" src={image} alt="woow" />
        </IconButton>
      </div>
      <div className='d-flex flex-column py-1'>
        {name}
        <div>{<TimeAgo date={date} />}</div>
      </div>
    </div>
  );
}
export default UserHeaderInfo;
