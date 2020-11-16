import React, { Component } from "react";
import { InputText } from 'primereact/inputtext';
import "./inbox.css"
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Mensaje from "../dominio/mensaje";
import { BusquedaComponent } from "../busqueda/busqueda";
import { mensajeService } from '../services/mensaje-service'

export class InboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensajes:[],
      valorBusqueda:""
    };
  }

  async componentDidMount () {
    try {
      const mensajes = await mensajeService.allInstances(1)
      this.setState({mensajes : mensajes}) 
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

  leidoTemplate = (mensaje) => {
    return (
      mensaje.leido ?
      //<span title="No leído"  style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
      <i onClick={()=>this.leerMensaje(mensaje)} className="pi pi-inbox"></i>
      //</span>
    :
      //<span title="No leído"  style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
      <i onClick={()=>this.leerMensaje(mensaje)} className="pi pi-envelope"></i>
      // </span>
    )
  }

  leerTemplate = (mensaje) => {
    return (
      mensaje.leido ?
          <i onClick={() => this.setearLeido(mensaje)} className="pi pi-eye-slash border"></i> :
        //<span title="No leído" data-testid={'noLeido' + id} className="p-badge p-badge-warning icon-badge" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
          <i onClick={() => this.setearLeido(mensaje)} className="pi pi-eye border"></i>
        //</span>
    )
  }

  eliminarTemplate = (mensaje) => {
    return (
          <i onClick={() => this.eliminarMensaje(mensaje)} className="pi pi-trash border"></i>
    )
  }

  buscar = async (valorBusqueda) => {
    const mensajesFiltrados= await mensajeService.buscarMensajes(valorBusqueda)
    this.setState({mensajes : mensajesFiltrados})
  }

  setearLeido = async(mensaje) => {
    mensaje.leido = !mensaje.leido 
    await mensajeService.actualizarMensaje(1/* this.props.usuario.id */, mensaje)
    this.setState ({mensajes : this.state.mensajes})
  }

  eliminarMensaje = async (mensajeAEliminar) => {
    await mensajeService.eliminarMensaje(1,mensajeAEliminar.id)
    const mensajesNoEliminados = this.state.mensajes.filter((mensajito) => mensajito.id !== mensajeAEliminar.id)
        this.setState({mensajes: mensajesNoEliminados})
}

leerMensaje = (mensaje) => {
  this.props.history.push(`/verMensaje/${mensaje.id}`)
}
 
  render() {
    return (
      <div className="separacion">
        <BusquedaComponent nombreTitulo="Búsqueda de mensajes" buscar={this.buscar}/>
        <h2>Resultados de la búsqueda</h2>
        <DataTable value={this.state.mensajes}>
                <Column className ="ancho-icono" body={this.leidoTemplate} ></Column>
                <Column className ="ancho-fecha" field="fechaYHoraDeEmision" ></Column>
                <Column className ="ancho-remitente" field="remitente" ></Column>
                <Column className ="ancho-icono" body={this.leerTemplate} ></Column>
                <Column className ="ancho-icono" body={this.eliminarTemplate}></Column>
            </DataTable>
      </div>
    );
  } 
}

export default InboxComponent;
