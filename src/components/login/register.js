import { Fragment, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { Link, Redirect } from "react-router-dom";
const Register = props => {
  // states
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(account));
  };

  const handleChange = ({ currentTarget }) => {
    var accountCopy = { ...account };
    accountCopy[currentTarget.name] = currentTarget.value;

    setAccount(accountCopy);
  };
  if (props.isLogin) {
    // redirect with flash message
    return <Redirect to="/home" />;
  }

  return (
    <Fragment>
      <Header />
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

export default Register;
