import React, { Component } from "react";
import { InputText } from 'primereact/inputtext';
import "./inbox.css"
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export class InboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensajes:[]
    };
  }

  render() {
    return (
      <div className = "separacion">
        <h1>Búsqueda de Mensajes</h1>
        <InputText className = "ancho"  value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
        <Button icon="pi pi-search iconoBusqueda" iconPos="right" />
        <h2>Resultados de la búsqueda</h2>
        <DataTable value={this.state.mensajes}>
                <Column field="code" ></Column>
                <Column field="date" ></Column>
                <Column field="category" ></Column>
                <Column field="quantity" ></Column>
                <Column field="quantity" ></Column>
            </DataTable>

      </div>
    );
  } 
}

export default InboxComponent;
