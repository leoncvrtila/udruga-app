import React, { Component } from "react";

export class Redirect extends Component {

  componentWillMount(){
    window.location.replace('http://www.uhb-rh.com');
  }
  render(){
    return (<section>Preusmjeravanje...</section>);
  }
}

export default Redirect;