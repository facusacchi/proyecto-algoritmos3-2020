import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { mensajeService } from "../services/mensaje-service";
import { InboxComponent } from "./inbox";
import Mensaje from "../dominio/mensaje";
import { usuarioService } from "../services/usuario-service";
import Usuario from "../dominio/usuario";

import userEvent from '@testing-library/user-event'


const mockMensajes = [
  new Mensaje("22/11/2020", "Pepito", false, "Juan", "", 13),
  new Mensaje("14/10/2020", "Jose", true, "Marta", "", 20),
  new Mensaje("22/11/2020", "Pepito", false, "Juan", "", 35),
];

describe("InboxComponent", () => {
  describe("cuando el servicio responde correctamente", () => {
    test("un mensaje no leido se puede marcar como leido", async () => {
      mensajeService.allInstances = () => Promise.resolve(mockMensajes);
      usuarioService.userLogged = new Usuario();
      const { getByTestId } = render(
        <BrowserRouter>
          <InboxComponent />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(getByTestId("marcarLeido13")).toBeInTheDocument();
      });
    });

    test("un mensaje leido se puede marcar como no leido", async () => {
      mensajeService.allInstances = () => Promise.resolve(mockMensajes);
      usuarioService.userLogged = new Usuario();
      const { getByTestId } = render(
        <BrowserRouter>
          <InboxComponent />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(getByTestId("marcarNoLeido20")).toBeInTheDocument();
      });
    });

    test('Al abrir un mensaje cambia de ruta', async () => {
      
      const pushEspia = jest.fn()
      const { getByTestId } = render(
          <InboxComponent
              history={{ push: pushEspia }}
          />)

      await waitFor(() => {

      fireEvent.click(getByTestId('abrirMensajito13'))
      expect(pushEspia).toBeCalledWith(`/verMensaje/13`)
      })
    })

    test('al buscar por nombre de remitente filtra sus mensajes', async () => {
      const { getByTestId } = render(<InboxComponent />)

      await waitFor(() =>  {

        const inputBusqueda = getByTestId('inputBusqueda')
        userEvent.type(inputBusqueda, 'Pep')
        
        fireEvent.click(getByTestId('buttonBuscar'))
        
        const mensajitosFiltrados = screen.findAllByTestId('tachito')
        expect(mensajitosFiltrados.length).toBe(2)
      })
    })
  });
});

