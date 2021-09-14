import { Fragment, useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";
import GoogleIcon from "@material-ui/icons/Google";
import { styled } from "@material-ui/core/styles";
import { loginWithGoogle, login, isLoggedIn } from "../../store/actions/index";

const Login = props => {
  const [account, setAccount] = useState({ email: "", password: "" });

  if (props.loggedIn) {
    // redirect with flash message
    return <Redirect to="/home" />;
  }
  const handleChange = ({ currentTarget }) => {
    const accountCopy = { ...account };
    accountCopy[currentTarget.name] = currentTarget.value;
    setAccount(accountCopy);
  };
  const handleLogin = e => {
    e.preventDefault();
    // login user
    props.login(account);
  };
  const handleLoginWithGoogle = e => {
    e.preventDefault();
    props.loginWithGoogle();
  };

  return (
    <Fragment>
      <Header />
      <div className="container-fluid" style={{ minHeight: "75vh" }}>
        <div className="row py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 border gx-5 gy-5">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email address
                    </label>
                    <input
                      name="email"
                      onChange={handleChange}
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="password"
                    />
                  </div>
                  <div class="mb-3">
                    <Stack spacing={1} direction="row">
                      <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="secondary"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={handleLoginWithGoogle}
                        variant="outlined"
                        color="secondary"
                        endIcon={<GoogleIcon />}
                      >
                        Login with Google
                      </Button>
                    </Stack>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn
  };
}
export default connect(mapStateToProps, { loginWithGoogle, login })(Login);
