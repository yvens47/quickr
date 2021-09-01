import "./App.css";
import IndexPage from "./components/home/IndexPage";
import Login from "./components/login/login";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppIndexPage from "./components/main/AppIndex";
import UserProfile from "./components/main/user-profile";
import Register from "./components/login/register";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path={["/"]}
            render={routerProps => <IndexPage {...routerProps} />}
          />
          <Route
            path={["/login", "/signin"]}
            render={routerProps => <Login {...routerProps} />}
          />
          <Route
            path={["/register", "/signup"]}
            render={routerProps => <Register {...routerProps} />}
          />
          <Route
            path={["/home", "/app"]}
            render={routerProps => <AppIndexPage {...routerProps} />}
          />
          <Route
            path={["/profile"]}
            render={routerProps => <UserProfile {...routerProps} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
