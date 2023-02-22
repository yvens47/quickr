import React, { Fragment, useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";
import { signUp, isLoggedIn } from "../../store/actions/index";
import { Button } from "@material-ui/core";

const Register = props => {
  // states
  const [account, setAccount] = useState({
    email: "",
    fullname: "",
    password: ""
  });
  const [error, setError] = useState({});

  // redirect if login no need to register
  if (props.loggedIn) return <Redirect to="/home" />;

  const handleSubmit = e => {
    e.preventDefault();

    // validate form before submited
    if (
      (error.fullname === "") & (error.email === "") &&
      error.password === ""
    ) {
      // submits form.
      props.signUp(account);
    } else {
      alert("please Fix Errors");
    }
  };

  const handleChange = ({ currentTarget }) => {
    var accountCopy = { ...account };
    const errorCopy = { ...error };
    accountCopy[currentTarget.name] = currentTarget.value;
    if (accountCopy.fullname !== "") {
      error.fullname = null;
    }
    
    if (accountCopy.email !== "") {
      error.email = null;
    }
    if (accountCopy.email !== "") {
      error.email = "";
    }
    if (accountCopy.password === "") {
      error.password = "please enter a password";
    }
    if (accountCopy.password < 8) {
      error.password = "Password is too short";
    }
    if (accountCopy.password !== "") {
      error.password = null;
    }

    setAccount(accountCopy);
  };
  const handleOnBlur = ({ currentTarget }) => {
    // const accountCopy = { ...account };
    // const errorCopy = { ...error };
    // if ((currentTarget.value === "") & (currentTarget.name === "fullname")) {
    //   errorCopy[currentTarget.name] = "Your name is required";
    // }
    // if ((currentTarget.value === "") & (currentTarget.name === "password")) {
    //   errorCopy[currentTarget.name] = "password is required";
    // }
    // if ((currentTarget.value === "") & (currentTarget.name === "password")) {
    //   errorCopy[currentTarget.name] = "password is required";
    // }
    // if ((currentTarget.value === "") & (currentTarget.name === "password") && (currentTarget.value.length <8)) {
    //   errorCopy[currentTarget.name] = "password is too short";
    // }
    

  //  setError(errorCopy);
  };

  return (
    <Fragment>
      <Header loggedIn={props.loggedIn} />
      <div
      style={{minHeight:'95vh', color:"whitesmoke"}}
       className="registerWrapper d-flex align-items-center justify-content-center">

    
      <div className="container">
        <div className="row py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-10 col-md-4 col-lg-4 ">
                <h1 className="display-5">Register</h1>
                <p className="lead">Become a member of Quickr Today</p>
                <form id="form_registration"
                    style={{ background:"#14102f"}}
                  onSubmit={handleSubmit}
                  class="mt-3 row g-3  p-5 shadow-sm rounded"
                >
                  <div className=" col-12">
                    <label for="validationCustom01" className="form-label">
                      Full Name
                    </label>
                    <input
                      id="validationCustom01"
                      required
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      name="fullname"
                      type="text"
                      // className="form-control"
                      placeholder="Your Full name"
                    />
                    {error.fullname && (
                      <div className="alert alert-danger border0 p-0">
                        <span>
                          <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        {error.fullname}
                      </div>
                    )}
                  </div>

                  <div className=" col-12 ">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email address
                    </label>
                    <input
                      onBlur={handleOnBlur}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      // className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                    {error.email && (
                      <div className="alert alert-danger border0 p-0">
                        <span>
                          <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        {error.email}
                      </div>
                    )}
                  </div>

                  <div className=" col-12">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                        onBlur={handleOnBlur}
                      name="password"
                      type="password"
                      // className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="password"
                    />
                    {error.password && (
                      <div className="alert alert-danger border0 p-0">
                        <span>
                          <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        {error.password}
                      </div>
                    )}
                  </div>
                  <div className=" col-12 ">
                    <Button
                      variant="contained"
                      className="mr-1"
                      color="secondary"
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>
                    <span className="ml-1">
                      or <Link to="/login">Login</Link>
                    </span>
                  </div>
                </form>
              </div>
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
export default connect(mapStateToProps, { signUp, isLoggedIn })(Register);
