import axios from 'axios'

import { REST_SERVER_URL } from './constants'

class UsuarioService {

    async allInstances() {
        const usuariosJson = await axios.get(`${REST_SERVER_URL}/usuarios`)
        return usuariosJson.data.map(usuarioJson => Usuario.fromJson(usuarioJson)) 
    }

}
export const usuarioService = new UsuarioService()