import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing(props) {
  return (
    <React.Fragment>
      <h2 id="title">Welcome to Blogium</h2>
      <div id="content">
        <p>
          Blogium is a blog platform inspired by Medium. It features a fully
          functional WYSIWYG text editor and a minimalist design to focus user's
          attention on reading and creating blog posts. I created Blogium to
          expand my knowledge of Web Development and teach myself some skills I
          hadn't learned yet; such as creating a rich text editor from scratch,
          allowing users to upload images to a hosting service, and how to build
          some basic social features like comments and editable user profiles.
          It was a fun learning experience and I am excited to share it with
          hiring managers to showcase my abilities.
        </p>

        <p>
          Clicking this link will direct you to the main page. From there you
          can view posts made by other users or create your own account. There
          are demo user credentials listed on the login page for anyone who does
          not want to create an account. Keep in mind the demo account will have
          likely been used by others.
        </p>
        <Link to="/main" className="clickMe landing">
          Main Page
        </Link>
      </div>
    </React.Fragment>
  );
}
