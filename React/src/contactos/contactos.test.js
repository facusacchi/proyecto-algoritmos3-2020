import { render, waitFor, fireEvent, screen, within } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { usuarioService } from "../services/usuario-service";
import Usuario from "../dominio/usuario";
import ContactosComponent from "./contactos"
import userEvent from '@testing-library/user-event'

const mockUsuarios = [
    new Usuario(1, "Pepe Palala", "pepito", "123"),
    new Usuario(2, "Manolo Palala", "manolito", "456"),
    new Usuario(2, "Pancho Rancho", "pancho", "789"),
  ];

  describe('cuando el servicio responde correctamente', () => {
    test('se muestran los contactos en la tabla', async () => {
      usuarioService.allInstances = () => Promise.resolve(mockUsuarios)
      usuarioService.userLogged = new Usuario();
      const { getByTestId } = render(<BrowserRouter><ContactosComponent /></BrowserRouter>)
      // nueva variante -> waitFor
      await waitFor(() => {
        expect(getByTestId('busqueda-contactos')).toBeInTheDocument()
        expect(getByTestId('contactos-table')).toBeInTheDocument()
      })
    })

    test('y se clickea el boton seleccionar de un contacto, nos redirige a la ruta de nuevoMensaje con el id', async () => {
        const pushEspia = jest.fn()
        const { getByTestId } = render(<BrowserRouter><ContactosComponent history={{ push: pushEspia }}/></BrowserRouter>)
        await waitFor(() => {
            fireEvent.click(getByTestId("seleccionar1"))            
            expect(pushEspia).toBeCalledWith("/nuevoMensaje/1")
        })
    })



    test('buscar pep devuelve la lista con un solo contacto, Pepe Palala', async () => {
        const { getByTestId } = render(<BrowserRouter> <ContactosComponent /> </BrowserRouter>)
        const busquedaComponent = getByTestId('busqueda-contactos')
        userEvent.type(busquedaComponent, 'pep')
        const allCountries = await screen.findAllByTestId('contactos-table')
        expect(allCountries[0]).toHaveTextContent('Pepe Palala')
      })
  })