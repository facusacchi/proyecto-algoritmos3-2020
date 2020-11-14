import axios from 'axios'

import { REST_SERVER_URL } from './constants'
import Mensaje from '../dominio/mensaje'

class MensajeService {

    mensajeAsJson(mensajeJSON) {
        return Mensaje.fromJson(mensajeJSON)
    }

    //obtener todos los mensajes de un usuario
    async allInstances(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/inbox/${id}`)
        return data
    }

    //obtener un mensaje en particular de un usuario
    async getMensajeById(id, mensajeId) {
        const mensajeJson = await axios.get(`${REST_SERVER_URL}/${id}/mensaje/${mensajeId}`)
        return this.mensajeAsJson(mensajeJson.data)
    }

    async buscarMensajes(valorBusqueda) {

    }

}
export const mensajeService = new MensajeService()