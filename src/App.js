import "./App.css";
import IndexPage from "./components/home/IndexPage";
import Login from "./components/login/login";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppIndexPage from "./components/main/AppIndex";
import UserProfile from "./components/main/user-profile";
import Register from "./components/login/register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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
            path={["/profile"]}
            render={routerProps => (
              <UserProfile
                logout={logout}
                loggedIn={props.loggedIn}
                {...routerProps}
              />
            )}
          />
        </Switch>
      </Router>
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
