import "./busqueda.css"

export class BusquedaComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
       valorBusqueda : ""
      };
    }

    render() {
        return (
          <div className = "separacion">
            <h1>Búsqueda de Mensajes</h1>
            <InputText className = "ancho"  value={this.state.valorBusqueda} onChange={(e) => this.setState({valorBusqueda: e.target.value})} />
            <Button onClick={this.buscar} icon="pi pi-search iconoBusqueda" iconPos="right" />
          </div>
        );
      } 
}