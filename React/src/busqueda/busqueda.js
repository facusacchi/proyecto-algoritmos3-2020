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
            <InputText className = "ancho"  value={this.state.valorBusqueda} onChange={(e) => this.setState({valorBusqueda: e.target.value})} />
            <Button onClick={()=>this.props.buscar(this.state.valorBusqueda)} icon="pi pi-search iconoBusqueda" iconPos="right" />
          </div>
        );
      } 
}