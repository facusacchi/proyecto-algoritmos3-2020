
export default class Usuario {
    constructor(id, nombre, username, password) {
        this.id = id
        this.nombreYApellido = nombre
        this.userName = username
        this.password = password
    }

    static fromJson(usuarioJSON) {
        return Object.assign(new Usuario(), usuarioJSON)
      }
}