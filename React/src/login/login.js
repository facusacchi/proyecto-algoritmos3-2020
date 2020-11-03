import React, { Component } from "react";
import { Card } from "primereact/card";
import "./login.css"
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

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
        <InputText value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
        <span className="p-float-label">
    <InputText id="in" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
    <label htmlhtmlFor="in">Username</label>
</span>

        <Button label="Save" />
        </Card>
      </div>
    );
  }
}
