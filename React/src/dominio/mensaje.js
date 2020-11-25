export default class Mensaje {
  constructor(fecha, emisor, leido = false, destinatario, cuerpo, id) {
    this.fechaYHoraDeEmision = fecha
    this.fechaYHoraDeLectura = fecha
    this.remitente = emisor
    this.leido = leido
    this.destinatario = destinatario
    this.cuerpo = cuerpo
    this.id = id
  }

  static fromJson(mensajeJSON) {
    return Object.assign(new Mensaje(), mensajeJSON)
  }

  toJSON() {
    return {
      ...this,
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