import axios from 'axios'
import Usuario from '../dominio/usuario'

import { REST_SERVER_URL } from './constants'

class UsuarioService {

    async allInstances() {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios`)
        //return data.map(usuario => Usuario.fromJson(usuario))
        return data
    }

}
export const usuarioService = new UsuarioService()