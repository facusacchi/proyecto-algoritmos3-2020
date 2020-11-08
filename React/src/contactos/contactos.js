import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import './contactos.css'
import { Button } from 'primereact/button'

export class ContactosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personas: [
                new Persona("Carlos"),
                new Persona("Carolina"),
                new Persona("Alicia"),
                new Persona("Martin"),
                new Persona("Jose")
            ]
        };
    }

    render() {
        return (
            <div className="container-table">
                <div className="span-busqueda">
                    <span>Resultado de la busqueda</span>
                </div>
                <div className="table">
                    <DataTable value={this.state.personas}>
                        <Column field="nombre" header="Personas"></Column>
                    </DataTable>
                </div>
                <div className="container-button">
                    <Button label="Cancelar" />
                </div>
            </div>
        );
    }
} 

export default ContactosComponent

export class Persona {
    constructor(nombre) {
        this.nombre = nombre
    }
}