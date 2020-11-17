import React, { createContext } from 'react'
import Usuario from '../dominio/usuario'

export const Context = createContext()

export class Provider extends React.Component {
    state = {
        userLogged: new Usuario(),
        userName: '',
        password: '',
        error: false
    }

    
    
      loguearUsuario = async () => {
        const jsonDataLogin = { userName: this.state.userName, password: this.state.password }
        try {
          const usuarioLogueado = await usuarioService.loguearUsuario(jsonDataLogin)
          this.setState({
            userLogged: usuarioLogueado
          })
          this.props.history.push('/inbox')
        } catch (e) {
          this.setState({
            error: true
          })
        }
      }

    render() {
        const value = {
            userLogged: this.state.userLogged,
            userName: this.state.userName,
            password: this.state.password,
            error: this.state.error,
            loguearUsuario: this.state.loguearUsuario
        }
        return (
          <Context.Provider value={value}>
            {this.props.children}
          </Context.Provider>
    
        )
      }
}