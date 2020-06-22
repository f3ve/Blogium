import React from "react";
import ReactDOM from "react-dom";
import PostPage from "./postPage";
import { BrowserRouter } from "react-router-dom";

describe("PostPage route", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <PostPage />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
