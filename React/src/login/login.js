import React, { Component } from "react";
import { Card } from "primereact/card";
import "./login.css"
import { Button } from 'primereact/button';

export class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: [],
      errorMessage: "",
    };
  }

  render() {
    return (
      <div className = "centrado">
        <Card className = "cardLogin">
        <div className="titulo">TeleFood</div>
        <Button label="Save" />
        </Card>
      </div>
    );
  }
}
