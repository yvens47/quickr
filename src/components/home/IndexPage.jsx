import React, { Fragment, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import "./home.css";
import online from "../../images/undraw_video_game_night_8h8m.svg";
import morning from "../../images/undraw_Selfie_re_h9um.svg";
import session from "../../images/undraw_photo_session_clqr.svg";
import documents from "../../images/undraw_My_documents_re_13dc.svg";
import Cols from "../col-md";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../store/actions/index";
function IndexPage(props) {
  // useEffect(() => {
  //   props.isLoggedIn();
  // }, []);
  if (props.loggedIn) return <Redirect to="/home" />;

  return (
    <Fragment>
      <div style={{ minHeight: "100vh", background: "#201c3c", color: "#fefefe" }}>
        <Header loggedIn={props.loggedIn} />
        <div className="container-fluid">
          <div
            // style={{ minHeight: "100hvh" }}
            className="d-flex p-0 banner 
            justify-content-center p-5 align-items-center ">

            <div className="row justify-content-center p-5 align-items-center ">
              <div className="col-md-8">
                <h1
                  style={{ color: "rgb(66 65 82)" }}
                  className="display-3 fw-bold  "
                >
                  {" "}
                  What is quickr
                </h1>

                <p className="small">
                  Aspernatur obcaecati nihil reprehenderit quis beatae omnis
                </p>
                <p className="fs-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur obcaecati nihil reprehenderit quis beatae omnis
                  perspiciatis vero,
                </p>
                <p>
                  <a
                    style={{ background: "#9c27b0" }}
                    className="btn btn-secondary border-0 btn-lg"
                    href="/register"
                  >
                    Signup
                  </a>
                </p>
              </div>
              {/* <div className="col-md-6">
                <div class="d-flex justify-content-center">
                  <img
                    src={morning}
                    className="online"
                    style={{ width: "60%", opacity: "90%" }}
                    alt="online banner "
                  />
                </div>
              </div> */}
            </div>

          </div>

          {/* <div className="row p-5">
            <div className="container">
              <div className="row justify-content-center">
                <Cols
                  size={"30%"}
                  image={online}
                  cssClasses="col-md-3 g-2 py-2"
                />
                <Cols
                  size={"30%"}
                  image={session}
                  cssClasses="col-md-3 g-2 py-2"
                />
                <Cols
                  size={"30%"}
                  image={documents}
                  cssClasses="col-md-3 g-2 py-2"
                />
              </div>
            </div>
          </div> */}
        </div>

        <Footer />
      </div>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn
  };
}
export default connect(mapStateToProps, { isLoggedIn })(IndexPage);
