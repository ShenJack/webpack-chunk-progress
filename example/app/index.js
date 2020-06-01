import React from 'react'
import ReactDOM from 'react-dom'
import ReactApp from "./react-app.jsx";
import lodash from 'lodash';

export default function app() {
    lodash.join("");
    let container = document.getElementById("react-app");
    ReactDOM.render(React.createElement(ReactApp), container);
}
