/* 
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Mensaje from '../dominio/mensaje'
import { VerMensajeComponent } from './verMensaje'
import { mensajeService } from '../services/mensaje-service'
import { usuarioService } from "../services/usuario-service";
import Usuario from "../dominio/usuario";

// Mensaje("14/10/2020", "Jose", true, "Marta", "Este es un mensaje de Jose para Marta", 2)

const mensaje = new Mensaje("22/11/2020 23:59", "22/11/2020 23:59", "Pepito", true, "Juan", "Este es un mensaje de Pepito para Juan", 1)
const mensajeId = 1

const props = {
    match: {
        params: {
            id: 1
        }
    }
};

describe('VerMensajeComponent', () => {
    describe('cuando el servicio responde correctamente', () => {
        beforeEach(() => {
            mensajeService.getMensajeById = () => Promise.resolve(mensaje);
        })
        test('se muestra el remitente del mensaje', async () => {
            const { getByTestId } = render(<BrowserRouter><VerMensajeComponent /></BrowserRouter>)
            await waitFor(() => {
                expect(getByTestId('remitente')).toBeInTheDocument()
            })
        })
        test('se muestra la fecha del mensaje', async () => {
            const { getByTestId } = render(<BrowserRouter><VerMensajeComponent /></BrowserRouter>)
            await waitFor(() => {
                expect(getByTestId('fecha-mensaje')).toBeInTheDocument()
            })
        })
        test('si el mensaje está marcado como no leído, se muestra el ícono del ojo tachado', async () => {
            const { getByTestId } = render(<BrowserRouter><VerMensajeComponent /></BrowserRouter>)
            await waitFor(() => {
                expect(getByTestId('icono-noLeido')).toBeInTheDocument()
            })
        })
        test('si el mensaje está marcado como leído, se muestra el ícono del ojo sin tachar', async () => {
            mensaje.leido = true
            // console.log(mensaje)
            const { getByTestId } = render(<BrowserRouter><VerMensajeComponent {...props} /></BrowserRouter>)
            await waitFor(() => {
                expect(getByTestId('icono-leido')).toBeInTheDocument()
            })
        })
    })
}) 
*/