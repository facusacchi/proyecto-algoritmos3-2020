import axios from 'axios'

import { REST_SERVER_URL } from './constants'
import Mensaje from '../dominio/mensaje'

class MensajeService {

    mensajeAsJson(mensajeJSON) {
        return Mensaje.fromJson(mensajeJSON)
    }

    //obtener todos los mensajes de un usuario
    async allInstances(usuarioId) {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuario/${usuarioId}/buscarMensajes`)
        return data.map(mensajito => this.mensajeAsJson(mensajito))
    }

    //obtener un mensaje en particular de un usuario
    async getMensajeById(usuarioId, mensajeId) {
        const mensajeJson = await axios.get(`${REST_SERVER_URL}/${usuarioId}/mensaje/${mensajeId}`)
        return this.mensajeAsJson(mensajeJson.data)
    }

    async buscarMensajes(usuarioId, valorBusqueda) {
        const mensajesFiltrados = await axios.get(`${REST_SERVER_URL}/usuario/${usuarioId}/buscarMensajes/${valorBusqueda}`)
        return mensajesFiltrados.data.map((mensaje) => this.mensajeAsJson(mensaje))
    }

    async actualizarMensaje(usuarioId, mensaje) {
        return await axios.put(`${REST_SERVER_URL}/${usuarioId}/actualizarMensaje/${mensaje.id}`, mensaje.toJSON())
    }

    async eliminarMensaje(usuarioId, mensajeId) {
        await axios.delete(`${REST_SERVER_URL}/${usuarioId}/eliminarMensaje/${mensajeId}`)
    }

    async nuevoMensaje(usuarioId, mensaje) {
        await axios.post(`${REST_SERVER_URL}/${usuarioId}/enviarMensaje`, mensaje.toJSON())
    }

}
export const mensajeService = new MensajeService()