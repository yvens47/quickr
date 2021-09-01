import { Fragment, useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { signUp, isLoggedIn } from "../../store/actions/index";
const Register = props => {
  // states
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: ""
  });
  useEffect(() => {
    props.isLoggedIn();
  }, []);

  // redirect if login no need to register
  if (props.isLoggedIn) return <Redirect to="/home" />;

  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(account));
  };

  const handleChange = ({ currentTarget }) => {
    var accountCopy = { ...account };
    accountCopy[currentTarget.name] = currentTarget.value;

    setAccount(accountCopy);
  };

  return (
    <Fragment>
      <Header loggedIn={props.loggedIn} />
      <div className="container-fluid" style={{ minHeight: "75vh" }}>
        <div className="row py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-10 col-md-4 col-lg-4 border">
                <h1>Register</h1>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Email address
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Username
                  </label>
                  <input
                    onChange={handleChange}
                    name="username"
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Username"
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
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="password"
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="login"
                    className="btn btn-secondary"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
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
