
import React, { Fragment, useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";
import GoogleIcon from "@material-ui/icons/Google";
import { styled } from "@material-ui/core/styles";
import { loginWithGoogle, login, isLoggedIn } from "../../store/actions/index";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = props => {
  const [account, setAccount] = useState({ email: "", password: "" });

  if (props.loggedIn) {
    // redirect with flash message
    return (
      <Redirect
        to={{
          pathname: "home",

          state: {
            userid: props.user.uid
          }
        }}
      />
    );
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
      <div className="login-wrapper d-flex align-items-center justify-content-center" style={{minHeight:"95vh", color:"whitesmoke"}}>

     
      <div className="container" >
        
            <div className="row justify-content-center align-items-center ">
          <div className="col-sm-10 col-md-4 col-lg-4   gx-5 gy-5">
                <h1 className="display-4 text-center">Quickr</h1>
                {/* <p className="lead">Login to Quickr</p> */}
                <form
                id='form_registration'
                style={{ background:"#14102f"}}
                  onSubmit={handleLogin}
                  class="mt-3 row g-3   p-5 shadow rounded shadow"
                >
                  <div className="col-12">
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
                      // className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="col-12">
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
                      // className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="password"
                    />
                  </div>
                  <div class="col-12">
                    <Stack spacing={1} direction="row">
                      <Button
                      style={{ background:"#512da8"}}
                        onClick={handleLogin}
                        variant="contained"
                        color="secondary"
                      >
                        Login
                      </Button>
                      <Button
                        style={{ padding: "5px 7px" }}
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
                <p className="gx-3">
                  <Link
                    to="/forgot-password"
                    className="link-dark text-decoration-none"
                  >
                    Forgot password
                  </Link>
                </p>
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
    loggedIn: state.user.loggedIn,
    user: state.user
  };
}
export default connect(mapStateToProps, { loginWithGoogle, login })(Login);
