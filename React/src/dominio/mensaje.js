export default class Mensaje {
  constructor(fecha, emisor, leido = false, destinatario, cuerpo) {
    this.fechaYHoraDeEmision = fecha
    this.fechaYHoraDeLectura = fecha
    this.remitente = emisor
    this.leido = leido
    this.destinatario = destinatario
    this.cuerpo = cuerpo
  }

  static fromJson(mensajeJSON) {
    return Object.assign(new Mensaje(), mensajeJSON)
    /*  ,{ asignatario: Usuario.fromJSON(mensajeJSON.asignadoA) }) */
  }

  toJSON() {
    return {
      ...this,
      /*asignatario: null,
      asignadoA: this.asignatario.nombre, */
    }
  }

  validarMensaje() {
    if (this.cuerpo == '') {
      throw new UserException('Cuerpo del mensaje vacío')
    }
  }
}

class UserException extends Error {
  toString() {
    return this.message
  }
}