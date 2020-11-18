import React, { Component } from 'react'
import "../verMensaje/verMensaje.css"
import Mensaje from '../dominio/mensaje'
import Usuario from '../dominio/usuario'
import { mensajeService } from '../services/mensaje-service'
import { usuarioService } from '../services/usuario-service'
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

export class NuevoMensajeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaje: new Mensaje(),
            cuerpo: '',
            destinatario: new Usuario()
        };
        /* this.addMessages = this.addMessages.bind(this); */
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

    addMessages = (result) => {
        this.msg.show([
            result == 'success' ?
                { severity: 'success', detail: 'Mensaje enviado', sticky: true }
                :
                { severity: 'error', detail: result.toString() /*'No se pudo enviar el mensaje' */ }
        ]);
    }

    enviarMensaje = async (mensaje) => {
        mensaje.destinatario = this.state.destinatario.nombreYApellido
        mensaje.remitente = usuarioService.userLogged.nombreYApellido
        mensaje.cuerpo = this.state.cuerpo
        try {
            this.state.mensaje.validarMensaje()
            await mensajeService.nuevoMensaje(this.props.match.params.id, mensaje)
            this.addMessages('success')
        } catch (e) {
            this.addMessages(e)
        }
    }

    render() {
        const { mensaje, destinatario } = this.state
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
                        <Button label="Enviar" className="p-button-lg boton-secundario" onClick={() => this.enviarMensaje(mensaje)} />
                        <Button label="Cancelar" className="p-button-lg p-button-secondary boton-secundario" onClick={this.volver} />
                    </div>
                </div>
                <div className="resultado-mensaje">
                    <Messages ref={(el) => this.msg = el} />
                </div>
            </div>
        );
    }

}

export default NuevoMensajeComponent