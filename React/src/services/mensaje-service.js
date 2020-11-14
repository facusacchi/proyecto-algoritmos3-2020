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

    async actualizarMensaje(id, mensaje) {
        /* const indiceActualizar = this.mails.findIndex((mail) => mail.id === mensaje.id)
        if (indiceActualizar === -1) {
            this.mails.push(mensaje)
        } else {
            this.mails[indiceActualizar] = mensaje
        } */
        return await axios.put(`${REST_SERVER_URL}/${id}/actualizarMensaje/${mensaje.id}`, mensaje.toJSON())
    }

}
export const mensajeService = new MensajeService()