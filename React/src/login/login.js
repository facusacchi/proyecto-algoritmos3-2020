import React, { useContext } from "react";
import { Card } from "primereact/card";
import "./login.css"
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Context } from '../context/context'

export const LoginComponent = () => {
  const { userName, password, error, loguearUsuario } = useContext(Context)

  const setearUserName = (event) => {
      userName = event.target.value
  }

  const setearPassword = (event) => {
      password = event.target.value
  }

    return (
      <div className="centrado">
        <Card className="cardLogin">
          <div className="titulo">TeleFood</div>
          <div className="p-fluid">
            <span className="p-float-label margin-top">
              <InputText id="in" value={userName} onChange={(event) => setearUserName(event)} />
              <label htmlFor="in">Usuario</label>
            </span>
            <span className="p-float-label margin-top">
              <Password id="password" value={password} onChange={(event) => setearPassword(event)} feedback={false} />
              <label htmlFor="password">Contraseña</label>
            </span>
          </div>
          <div className="p-p-4">
            <Button className="p-button-lg p-component p-d-block p-mx-auto" label="Ingresar" onClick={() => loguearUsuario} />
          </div>
          <div className="mensaje-error">
            {error && <span>Usuario o contraseña invalidos</span>}
          </div>
        </Card>
      </div>
    )
}

export default LoginComponent