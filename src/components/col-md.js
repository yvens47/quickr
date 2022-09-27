import React from "react";
const Cols = ({ cssClasses, image, size }) => {
  return (
    <div
      style={{ background: "#14102f", padding: "20px" }}
      className={`${cssClasses}  me-2 rounded`}>
      <div className="col-image mb-5  ">
        <img
          src={image}
          className="online d-block mb-3"
          style={{ width: size }}
          alt="online banner "
        />
      </div>

      <h1 className="h2">Hello world</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        obcaecati nihil reprehenderit quis beatae omnis
      </p>
      {/* <p>
        <a className="btn btn-secondary" href="/register">
          Signup
        </a>
      </p> */}
    </div>
  );
};

export default Cols;
