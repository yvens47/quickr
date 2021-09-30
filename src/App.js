import "./App.css";
import IndexPage from "./components/home/IndexPage";
import Login from "./components/login/login";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import AppIndexPage from "./components/main/AppIndex";
import UserProfile from "./components/main/user-profile";
import Register from "./components/login/register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  isLoggedIn,
  logOut,
  getPosts,
  addPost,
  likePost,
  addComment
} from "./store/actions/index";
import { connect } from "react-redux";
import { useEffect } from "react";
import OffCanvas from "./components/main/offcanvas";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core/";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function App(props) {
  useEffect(() => {
    props.isLoggedIn();
  }, []);
  const logout = e => {
    e.preventDefault();

    props.logOut();
    //props.isLoggedIn();
  };
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
        <Switch>
          <Route
            exact
            path={["/"]}
            render={routerProps => (
              <IndexPage
                logout={logout}
                loggedIn={props.loggedIn}
                {...routerProps}
              />
            )}
          />
          <Route
            path={["/login", "/signin"]}
            render={routerProps => (
              <Login
                logout={logout}
                loggedIn={props.loggedIn}
                {...routerProps}
              />
            )}
          />
          <Route
            path={["/register", "/signup"]}
            render={routerProps => (
              <Register
                logout={logout}
                loggedIn={props.loggedIn}
                {...routerProps}
              />
            )}
          />
          <Route
            path={["/home", "/app"]}
            render={routerProps => (
              <AppIndexPage
                logout={logout}
                loggedIn={props.loggedIn}
                {...routerProps}
              />
            )}
          />
          <Route
            exact
            path={["/profile/:user"]}
            render={routerProps =>
              props.loggedIn ? (
                <UserProfile
                  user={props.user && props.user}
                  logout={logout}
                  loggedIn={props.loggedIn}
                  {...routerProps}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { referrer: "/profile/:user" }
                  }}
                />
              )
            }
          />
        </Switch>
      </Router>
      <OffCanvas title={"friends Request"}>
        <ul className="list-group">
          {props.user &&
            props.user.friendRequests &&
            props.user.friendRequests.map(user => (
              <li className="list-group-item shaddow-sm justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="p-2 d-flex flex-grow-1">
                    <div>
                      {" "}
                      <Avatar src={user.photoURL} />
                    </div>
                    <div>
                      <p> {user.displayName}</p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>
                      <IconButton>
                        <PersonAddIcon />
                      </IconButton>
                    </div>
                    <div>
                      <IconButton color="secondary">
                        {" "}
                        <RemoveCircleIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </OffCanvas>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.user
  };
}
export default connect(mapStateToProps, {
  isLoggedIn,
  getPosts,
  addPost,
  likePost,
  addComment,
  logOut
})(App);
