import { Component, OnInit } from '@angular/core';
import { Service } from 'app/service';
import { Receta } from '../../../../Dominio/src/receta';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-agregar-colaborador',
  templateUrl: './agregar-colaborador.component.html',
  styleUrls: ['./agregar-colaborador.component.css']
})
export class AgregarColaboradorComponent implements OnInit {

  receta: Receta
  usuarios: Usuario[]
  colaborador: Usuario
  usuarioSeleccionado: Usuario

  constructor(private service: Service) {
    this.receta = this.service.getRecetaActual
  }

  async ngOnInit() {
    this.usuarios = await this.service.todosLosUsuarios()
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario
  }

  agregarPaso(): void {
    this.receta.agregarColaborador(this.usuarioSeleccionado)
  }

  colorSeleccionado(usuario: Usuario) {
    if (this.usuarioSeleccionado == usuario) {
      return "colorSeleccionado"
    }
    return ""
  }

  agregarColaborador(): void {
    this.receta.agregarColaborador(this.usuarioSeleccionado)
  }

}
