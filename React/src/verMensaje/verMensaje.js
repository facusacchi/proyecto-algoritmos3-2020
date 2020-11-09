import React, { Component } from 'react'
import "./verMensaje.css"
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
export class VerMensajeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="page">
                <div className="card">
                    <div className="info-mensaje">
                        <div className="icono-mensaje">
                            <i className="pi pi-user icono-user"></i>
                            <span className="mensaje-titulo">Mensaje</span>
                        </div>
                        <div className="nombre-contacto-container">
                            <span className="nombre-contacto">De Alicia</span>
                            <span className="fecha-mensaje">18/09/2020 17:30</span>
                            <div className="iconos-mensaje">
                                <i className="pi pi-trash"></i>
                                <i className="pi pi-eye-slash"></i>
                            </div>
                        </div>
                    </div>
                    <InputTextarea className="textarea-mensaje" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} disabled />
                    <div className="boton-container">
                        <Button label="Volver" className="p-button-secondary" onClick={this.handleClick} />
                    </div>
                </div>
            </div>
        );
    }

}

export default VerMensajeComponent