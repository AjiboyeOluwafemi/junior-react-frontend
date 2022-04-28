import React, { Component } from "react";
import "./errorPage.scss";


export default class Errorpage extends Component {


  render() {
    const pathName = window.location.pathname.slice(1);
    
    return (
        <div className="errorPage change">
          <h1>This Page "{pathName}" Doesn't Exist!</h1>
        </div>
    );
  }
}
