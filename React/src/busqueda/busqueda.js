import React, { Component } from "react";
import { InputText } from 'primereact/inputtext';
import "./busqueda.css"
import { Button } from 'primereact/button';

export class BusquedaComponent extends Component {

    constructor(props) {
      super(props);
      this.state = {
       valorBusqueda : ""
      };
    }

    render() {
        return (
          <div>
            <h1>{this.props.nombreTitulo}</h1>
            <InputText data-testid ="inputBusqueda" className = "ancho"  value={this.state.valorBusqueda} onChange={(e) => this.setState({valorBusqueda: e.target.value})} data-testid="busqueda-mensajes"/>
            <Button data-testid ="buttonBuscar" onClick={()=>this.props.buscar(this.state.valorBusqueda)} icon="pi pi-search iconoBusqueda" iconPos="right" />
          </div>
        );
      } 
}