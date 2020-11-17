import Usuario from '../dominio/usuario'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class UsuarioService {

    async allInstances() {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios`)
        return data.map(usuario => Usuario.fromJson(usuario))
    }

    async getDestinatario(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/perfilDeUsuario/${id}`)
        return Usuario.fromJson(data)
    }

    async getContactos(valorBusqueda) {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios/${valorBusqueda}`)
        return data.map(usuario => Usuario.fromJson(usuario))
    }

    async loguearUsuario(jsonDataLogin) {
        const { data } = await axios.post(`${REST_SERVER_URL}/login`, jsonDataLogin)
        return Usuario.fromJson(data)
    }

}
export const usuarioService = new UsuarioService()