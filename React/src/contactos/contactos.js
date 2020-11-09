import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import './contactos.css'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

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
            ],
            valorBusqueda: ""
        };
    }

    buscar = () => {
        const contactosFiltrados = this.state.contactos.filter(contacto => contacto.nombre.includes(this.state.valorBusqueda))
        this.setState ( { personas : contactosFiltrados })
    }

    render() {
        return (
            <div className="container">
                <div className="search-and-button">
                    <h1 className="header-search">Búsqueda de Contactos</h1>
                    <div className="input-and-button">
                        <InputText  className="inputtext-contactos" value={this.state.valorBusqueda} onChange={(e) => this.setState({valorBusqueda: e.target.value})} />
                        <Button className="button" onClick={this.buscar} icon="pi pi-search iconoBusqueda" iconPos="right" />
                    </div>
                </div>

                <div className="span-busqueda">
                    <span>Resultado de la busqueda</span>
                </div>
                <div className="table-and-button">
                    <div className="table">
                        <DataTable className="data-table" value={this.state.personas}>
                            <Column className="column" field="nombre" header="Personas"></Column>
                        </DataTable>
                    </div>
                    <div className="container-button">
                        <Button label="Cancelar" className="p-button-secondary"/>
                    </div>
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