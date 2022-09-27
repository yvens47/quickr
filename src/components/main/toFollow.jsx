import { Avatar, Badge, IconButton, TextField } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
const PeopleToFollow = () => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="flex-shrink-1 me-3">
                <Avatar />
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <div className="fw-bold">Jean Pierre </div>
                <div className="" style={{ color: "#69696d" }}>@realgovnewsom40</div>

            </div>
            <div>
                <IconButton style={{ color: "#69696d" }} color="secondary">
                    <ClearIcon />
                </IconButton>
            </div>

        </div>
    );
}

export default PeopleToFollow;