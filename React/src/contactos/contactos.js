import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import './contactos.css'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { usuarioService } from '../services/usuario-service'

export class ContactosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactos: [],
            valorBusqueda: ""
        };
    }

    async componentDidMount() {
        try {
            const contactos = await usuarioService.allInstances()
            this.setState({
                contactos,
            })
          } catch (e) {
            this.generarError(e)
          }
    }

    generarError = (errorMessage) => {
        this.setState({
          errorMessage: errorMessage.toString()
        })
    }

    cancelar = () => {
        this.props.history.push('/inbox')
    }

    buscar = async (valorBusqueda) => {
        const contactosFiltrados = await usuarioService.getContactos(valorBusqueda)
        this.setState({
            contactos: contactosFiltrados
        })
    }

    seleccionar = (contacto) => {
        return(
            <Button className="button" icon="pi pi-check" label="Seleccionar" onClick={() =>  this.props.history.push(`/nuevoMensaje/${contacto.id}`)}/>
        )
    }

    alCambiarValorDeBusqueda = (event) => {
        this.setState({
            valorBusqueda: event.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="search-and-button">
                    <h1 className="header-search">Búsqueda de Contactos</h1>
                    <div className="input-and-button">
                        <InputText  className="inputtext-contactos" value={this.state.valorBusqueda} onChange={(event) => this.alCambiarValorDeBusqueda(event)} />
                        <Button className="button" onClick={ () => this.buscar(this.state.valorBusqueda) } icon="pi pi-search iconoBusqueda" iconPos="right" />
                    </div>
                </div>

                <div className="span-busqueda">
                    <span>Resultado de la busqueda</span>
                </div>
                <div className="table-and-button">
                    <div className="table">
                        <DataTable value={this.state.contactos} autoLayout={true}>
                            <Column className="columnName" field="nombreYApellido" header="PERSONAS"></Column>
                            <Column className="columnButton" body={this.seleccionar} ></Column>
                        </DataTable>
                    </div>
                </div>
                    <div className="container-button">
                        <Button label="Cancelar" className="p-button-secondary" onClick={this.cancelar} />
                    </div>
            </div>
        );
    }
} 

export default ContactosComponent