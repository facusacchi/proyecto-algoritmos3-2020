import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import "./verMensaje.css"
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Mensaje from '../dominio/mensaje'
import { mensajeService } from '../services/mensaje-service'
export class VerMensajeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaje: new Mensaje()
        };
    }

    async componentDidMount() {
        try {
            const mensaje = await mensajeService.getMensajeById(1/* usuario Logueado -> usuario.id */, this.props.match.params.id)
            this.setState({
                mensaje,
            })
            !mensaje.leido ? this.cambiarEstadoLectura(mensaje) : ''
        } catch (e) {
            this.generarError(e)
            console.log(e)
        }
    }

    generarError = (errorMessage) => {
        this.setState({
            errorMessage: errorMessage.toString()
        })
    }

    volver = () => {
        this.props.history.push('/inbox')
    }

    leerTemplate = (mensaje) => {
        return (
            mensaje.leido ?
                <i onClick={() => this.cambiarEstadoLectura(mensaje)} className="pi pi-eye icono"></i> :
                <i onClick={() => this.cambiarEstadoLectura(mensaje)} className="pi pi-eye-slash icono"></i>
        )
    }

    cambiarEstadoLectura = async (mensaje) => {
        mensaje.leido = !mensaje.leido
        await mensajeService.actualizarMensaje(1/* this.props.usuario.id */, mensaje)
        /* setMensaje([...mensaje]) */
        this.setState({})
    }

    eliminarMensaje = async (mensajeId) => {
        await mensajeService.eliminarMensaje(1/* this.props.usuario.id */, mensajeId)
        this.props.history.push('/inbox')
    }

    render() {
        const { mensaje } = this.state
        return (
            <div className="page">
                <div className="card">
                    <div className="info-mensaje">
                        <div className="icono-mensaje">
                            <i className="pi pi-user icono-user"></i>
                            <span className="mensaje-titulo">Mensaje</span>
                        </div>
                        <div className="nombre-contacto-container">
                            <span className="nombre-contacto">De {mensaje.remitente}</span>
                            <span className="fecha-mensaje">{mensaje.fechaYHoraDeEmision}</span>
                            <div className="iconos-mensaje">
                                <i onClick={() => this.eliminarMensaje(mensaje.id)} className="pi pi-trash icono" ></i>
                                {this.leerTemplate(mensaje)}
                            </div>
                        </div>
                    </div>
                    <InputTextarea className="textarea-mensaje" value={mensaje.cuerpo} readOnly />
                    <div className="boton-container">
                        <Button label="Volver" className="p-button-lg p-button-secondary boton-secundario" onClick={this.volver} />
                    </div>
                </div>
            </div>
        );
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
            match: PropTypes.object,
        }
    }
}

export default VerMensajeComponent