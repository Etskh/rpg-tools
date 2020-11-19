import React from "react";
import ReactDom from "react-dom";
import Application from "./components/Application.jsx";
import "./rpg-tools.less";

const root = document.createElement("div");
document.body.appendChild(root);
ReactDom.render(<Application />, root);