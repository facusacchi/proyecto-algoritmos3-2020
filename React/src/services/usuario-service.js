import axios from 'axios'

import { REST_SERVER_URL } from './constants'

class UsuarioService {

    usuarioAsJson(usuarioJSON) {
        return Usuario.fromJson(usuarioJSON)
    }

    async allInstances() {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios`)
        return data.map(usuario => this.usuarioAsJson(usuario)) 
    }

}
export const usuarioService = new UsuarioService()