import React, { Component } from 'react'
import "../verMensaje/verMensaje.css"
import Mensaje from '../dominio/mensaje'
import Usuario from '../dominio/usuario'
import { mensajeService } from '../services/mensaje-service'
import {usuarioService} from '../services/usuario-service'
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

export class NuevoMensajeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaje: new Mensaje(),
            cuerpo: String,
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

    volver = () => {
        this.props.history.push('/inbox')
    }

    addMessages() {
        this.msgs2.show([
            { severity: 'success', detail: 'Mensaje enviado' /* , sticky: true */ },
            { severity: 'error', detail: 'No se pudo enviar el mensaje'/* , sticky: true */ }
        ]);
    }

    enviarMensaje = async (mensaje) => {
        mensaje.destinatario = this.state.destinatario.nombreYApellido
        mensaje.remitente = "prueba remitente desde front" /* tomar usuario Logueado -> usuario.nombreYApellido */
        mensaje.cuerpo = this.state.cuerpo
        await mensajeService.nuevoMensaje(this.props.match.params.id, mensaje)
        /* setMensaje([...mensaje]) */
        /* this.setState({}) */
    }

    render() {
        const { mensaje, destinatario, errorMessage } = this.state
        /*const snackbarOpen = !!errorMessage // O se puede usar Boolean(errorMessage) */
        return (
            <div className="page">
                <div className="card">
                    <div className="info-mensaje">
                        <div className="icono-mensaje">
                            <i className="pi pi-user icono-user"></i>
                            <span className="mensaje-titulo">Mensaje</span>
                        </div>
                        <div className="nombre-contacto-container">
                            <span className="nombre-contacto">Para {destinatario.nombreYApellido}</span>
                        </div>
                    </div>
                    <InputTextarea className="textarea-mensaje" onChange={(e) => this.setState({ cuerpo: e.target.value })} />
                    <div className="boton-container">
                        <Button label="Enviar" className="p-button-lg boton-secundario" onClick={() => this.enviarMensaje(mensaje)} /* {this.addMessages} */ />
                        <Button label="Cancelar" className="p-button-lg p-button-secondary boton-secundario" onClick={this.volver} />
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