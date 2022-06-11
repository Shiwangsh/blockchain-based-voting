import React from "react";

function UserHome(props) {
  return (
    <div>
      <div className="container-main">
        <div className="container-list-2 center-items container-item title general">
          <h1>Ongoing Election</h1>
          <br />
          <h2>Election Name: {props.el.electionTitle}</h2>
          <br />
          <h3>Orgnization Name: {props.el.organizationTitle}</h3>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
