import React, { Component } from 'react'
import "../verMensaje/verMensaje.css"
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import {usuarioService} from '../services/usuario-service'
import Usuario from '../dominio/usuario'

export class NuevoMensajeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinatario: new Usuario()
        };
        this.addMessages = this.addMessages.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        try {
            const destinatario = await usuarioService.getDestinatario(id)
            this.setState({
                destinatario,
            })
        } catch (e) {
            console.log("Error!!")
        }
    }

    addMessages() {
        this.msgs2.show([
            { severity: 'success', detail: 'Mensaje enviado' /* , sticky: true */ },
            { severity: 'error', detail: 'No se pudo enviar el mensaje'/* , sticky: true */ }
        ]);
    }

    render() {
        /*const { mensaje, errorMessage } = this.state
        const snackbarOpen = !!errorMessage // O se puede usar Boolean(errorMessage) */
        return (
            <div className="page">
                <div className="card">
                    <div className="info-mensaje">
                        <div className="icono-mensaje">
                            <i className="pi pi-user icono-user"></i>
                            <span className="mensaje-titulo">Mensaje</span>
                        </div>
                        <div className="nombre-contacto-container">
                            <span className="nombre-contacto">Para Carlos</span>
                        </div>
                    </div>
                    <InputTextarea className="textarea-mensaje" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <div className="boton-container">
                        <Button label="Enviar" className="p-button-lg boton-secundario" onClick={this.handleClick} onClick={this.addMessages} />
                        <Button label="Cancelar" className="p-button-lg p-button-secondary boton-secundario" onClick={this.handleClick} />
                    </div>
                </div>
                <div className="resultado-mensaje">
                    <Messages ref={(el) => this.msgs2 = el} />
                </div>
            </div>
        );
    }

}

export default NuevoMensajeComponent