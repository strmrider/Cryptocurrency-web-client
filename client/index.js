import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/main/main";
import MainModel from "./models/main";

const url = "http://localhost:8080";
const main = new MainModel(url);
ReactDOM.render(<Main main={main}></Main>, document.getElementById("root"));
