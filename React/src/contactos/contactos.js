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
            contactos: [],
            //nombresDeUsuarios: [],
            //valorBusqueda: ""
        };
    }

    async componentDidMount() {
        try {
            const contactos = await usuarioService.allInstances()
            //const nombresDeUsuarios = contactos.map(contacto => contacto.nombreYApellido)
            this.setState({
                //nombresDeUsuarios,
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

    render() {
        const { contactos } = this.state
        const nombreYApellido = contactos.map(contacto => contacto.nombreYApellido)

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
                        <DataTable className="data-table" value={nombreYApellido}>
                            <Column className="column" field="nombre" header="Personas"></Column>
                        </DataTable>
                    </div>
                </div>
                    <div className="container-button">
                        <Button label="Cancelar" className="p-button-secondary" onClick= {this.cancelar} />
                    </div>
            </div>
        );
    }
} 

export default ContactosComponent