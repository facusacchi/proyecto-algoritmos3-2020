import { render, waitFor, fireEvent } from '@testing-library/react'
import React from 'react'
import Usuario from '../dominio/usuario';
import { usuarioService } from '../services/usuario-service';

import { LoginComponent } from "./login";

const usuarioMock = new Usuario(1, 'Pepe palala', 'pepe', '123');

describe('LoginComponent', () => {
    describe('cuando el componente se renderiza correctamente', () => {
        test('se muestran dos inputs y un boton', async () => {
            const { getByTestId } = render(<LoginComponent />)
            await waitFor(() => {
                expect(getByTestId('username')).toBeInTheDocument()
                expect(getByTestId('password')).toBeInTheDocument()
                expect(getByTestId('botonIngresar')).toBeInTheDocument()
            })
        })
    })
    describe('cuando se clickea en el boton de Ingresar', () => {
        test('si el login es correcto, nos redirige a la ruta de inbox', async () => {
            usuarioService.loguearUsuario = () => Promise.resolve(usuarioMock);
            const pushEspia = jest.fn()
            const { getByTestId } = render(
                <LoginComponent history={{ push: pushEspia }} />
            )
            await waitFor(() => {
                fireEvent.click(getByTestId('botonIngresar'))
                expect(pushEspia).toBeCalledWith('/inbox')
            })
        })
        test('si el login falla, aparece un mensaje de error', async () => {
            usuarioService.loguearUsuario = () => Promise.resolve(error);
            const { getByTestId } = render(<LoginComponent />)
            fireEvent.click(getByTestId('botonIngresar'))
            await waitFor(() => {
                expect(getByTestId('mensajeError')).toBeInTheDocument()
            })
        })
    })
})