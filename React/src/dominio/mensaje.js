export default class Mensaje {
  constructor(fecha, emisor, leido = false) {
    this.fecha = fecha
    this.emisor = emisor
    this.leido = leido
  }

  static fromJson(mensajeJSON) {
    return Object.assign(new Mensaje(), mensajeJSON)
    /*  ,{ asignatario: Usuario.fromJSON(mensajeJSON.asignadoA) }) */
  }


}