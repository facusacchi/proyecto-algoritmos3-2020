import React, { Component } from "react";
import { Card } from "primereact/card";
import "./login.css"
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { usuarioService } from '../services/usuario-service'

export class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      error: false
    };
  }

  setearUserName = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  setearPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  loguearUsuario = async () => {
    const jsonDataLogin = { userName: this.state.userName, password: this.state.password }
    try {
      usuarioService.userLogged = await usuarioService.loguearUsuario(jsonDataLogin)
      this.props.history.push('/inbox')
    } catch (e) {
      this.setState({
        error: true
      })
    }
  }

  render() {
    return (
      <div className="centrado">
        <Card className="cardLogin">
          <div className="titulo">TeleFood</div>
          <div className="p-fluid">
            <span className="p-float-label margin-top">
              <InputText id="in" value={this.state.userName} onChange={(event) => this.setearUserName(event)} />
              <label htmlFor="in">Usuario</label>
            </span>
            <span className="p-float-label margin-top">
              <Password id="password" value={this.state.password} onChange={(event) => this.setearPassword(event)} feedback={false} />
              <label htmlFor="password">Contraseña</label>
            </span>
          </div>
          <div className="p-p-4">
            <Button className="p-button-lg p-component p-d-block p-mx-auto" label="Ingresar" onClick={() => this.loguearUsuario()} />
          </div>
          <div className="mensaje-error">
            {this.state.error && <span>Usuario o contraseña invalidos</span>}
          </div>
        </Card>
      </div>
    );
  }
}

export default LoginComponent