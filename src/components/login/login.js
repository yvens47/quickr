import { Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import { Link, Redirect } from "react-router-dom";
const Login = props => {
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
              <div className="col-md-6 border">
                <h1>Login</h1>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Email address
                  </label>
                  <input
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
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="password"
                  />
                </div>
                <div className="mb-3">
                  <button className="login" className="btn btn-secondary">
                    Login
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

export default Login;
