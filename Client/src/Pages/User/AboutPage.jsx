import React from "react";

export default function AboutPage() {
  return (
    <div>
      <h2>This Application Is About :</h2>
      <ul>
        <li>
          The main purpose of using MERN stack is to develop apps using
          JavaScript only. This is because the four technologies that make up
          the technology stack are all JS-based. Thus, if one knows JavaScript
          (and JSON), the backend, frontend, and database can be operated
          easily.
        </li>
      </ul>
      <h3>MERN Stack Components </h3>
      <ul>
        <li>
          The first component is MongoDB, which is a NoSQL database management
          system.
        </li>
        <li>
          The second MERN stack component is ExpressJS. It is a backend web
          application framework for NodeJS
        </li>
        <li>
          The third component is ReactJS, a JavaScript library for developing
          UIs based on UI components
        </li>
        <li>
          The final component of the MERN stack is NodeJS. It is a JS runtime
          environment, i.e., it enables running JavaScript code outside the
          browser.
        </li>
      </ul>
      <h3>User Activities</h3>
      <p>
        User can create a members list ,manage member details by Create, Update
        ,Delete
      </p>
      <h3>Profile Management</h3>
      <ul>
        <li>User can Manage profile information by updating as per need</li>
      </ul>

      <h2>Privacy</h2>
      <ul>
        <li> User list data is protected , password saved in Encrypted</li>
      </ul>

      <h6>You will be notified of any changes.</h6>
    </div>
  );
}
