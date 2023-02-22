import { Avatar, Badge, IconButton, TextField } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
const PeopleToFollow = ({popular, remove}) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="flex-shrink-1 me-3">
                <Avatar />
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <div className="fw-bold">{popular.displayName} <CheckCircleRoundedIcon style={{ color:"#fe4775"}}/> </div>
                <div className="" style={{ color: "#69696d" }}>{popular.handle}</div>

            </div>
            <div>
                <IconButton style={{ color: "#69696d" }} color="secondary" onClick={remove}>
                    <ClearIcon />
                </IconButton>
            </div>

        </div>
    );
}

export default PeopleToFollow;