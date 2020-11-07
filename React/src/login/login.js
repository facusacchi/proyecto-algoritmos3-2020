import React, { Component } from "react";
import { Card } from "primereact/card";
import "./login.css"
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

export class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="centrado">
        <Card className="cardLogin">
          <div className="titulo">TeleFood</div>
          <div className="p-fluid">
            <span className="p-float-label">
              <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
              <label htmlhtmlFor="in">Username</label>
            </span>
            <Password value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} /> <br />
          </div>
          <Button label="Ingresar" />
        </Card>
      </div>
    );
  }
}
