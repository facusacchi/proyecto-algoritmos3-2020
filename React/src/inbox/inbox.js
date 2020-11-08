import React, { Component } from "react";
import { InputText } from 'primereact/inputtext';
import "./inbox.css"
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Mensaje from "../dominio/mensaje";

export class InboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensajes:[]
    };
  }

  async componentDidMount () {
    const mensajes = [
      new Mensaje("10/11/2020", "Juan"),
      new Mensaje("03/04/2020", "Carlos"),
      new Mensaje("09/08/2020", "Paula", true),
      new Mensaje("09/08/2020", "Mariana")
    ]
    this.setState({mensajes : mensajes}) 
  }

  leidoTemplate = ({leido}) => {
    return (
      leido ?
      //<span title="No leído"  style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
      <i className="pi pi-inbox"></i>
      //</span>
    :
      //<span title="No leído"  style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
      <i className="pi pi-envelope"></i>
      // </span>
    )
  }

  leerTemplate = ({leido}) => {
    return (
      leido ?
          <i className="pi pi-eye-slash border"></i> :
        //<span title="No leído" data-testid={'noLeido' + id} className="p-badge p-badge-warning icon-badge" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
          <i className="pi pi-eye border"></i>
        //</span>
    )
  }

  eliminarTemplate = (mensaje) => {
    return (
          <i className="pi pi-trash border"></i>
    )
  }
 
  render() {
    return (
      <div className = "separacion">
        <h1>Búsqueda de Mensajes</h1>
        <InputText className = "ancho"  value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
        <Button icon="pi pi-search iconoBusqueda" iconPos="right" />
        <h2>Resultados de la búsqueda</h2>
        <DataTable value={this.state.mensajes}>
                <Column body={this.leidoTemplate} ></Column>
                <Column field="fecha" ></Column>
                <Column field="emisor" ></Column>
                <Column body={this.leerTemplate} ></Column>
                <Column body={this.eliminarTemplate}></Column>
            </DataTable>
      </div>
    );
  } 
}

export default InboxComponent;
