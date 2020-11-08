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
      mensajes:[],
      valorBusqueda: ""
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

  leerTemplate = (mensaje) => {
    return (
      mensaje.leido ?
          <i onClick={() => this.setearLeido(mensaje)} className="pi pi-eye-slash border"></i> :
        //<span title="No leído" data-testid={'noLeido' + id} className="p-badge p-badge-warning icon-badge" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
          <i className="pi pi-eye border"></i>
        //</span>
    )
  }

  eliminarTemplate = (mensaje) => {
    return (
          <i onClick={eliminarMensaje} className="pi pi-trash border"></i>
    )
  }

  buscar = () => {
    const mensajesFiltrados=this.state.mensajes.filter(mensaje => mensaje.emisor.includes(this.state.valorBusqueda))
    this.setState ( { mensajes : mensajesFiltrados })
  }

  setearLeido = (mensaje) => {
    mensaje.leido = !mensaje.leido 
    this.setState ( {})

  }

  eliminarMensaje = (mensaje) => {
//     const index = this.state.mensajes.indexOf();
// if (index > -1) {
//   array.splice(index, 1);
// }
//     this.state.mensajes.
//     this.setState ( { })

  }
 
  render() {
    return (
      <div className = "separacion">
        <h1>Búsqueda de Mensajes</h1>
        <InputText className = "ancho"  value={this.state.valorBusqueda} onChange={(e) => this.setState({valorBusqueda: e.target.value})} />
        <Button onClick={this.buscar} icon="pi pi-search iconoBusqueda" iconPos="right" />
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
