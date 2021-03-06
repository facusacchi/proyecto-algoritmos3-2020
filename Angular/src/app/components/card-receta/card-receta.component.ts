import { Component, Input } from '@angular/core';
import { Receta } from '../../../../src-dominio/receta';
import { Service } from 'app/service';
import { Usuario } from '../../../../src-dominio/usuario';

@Component({
  selector: 'app-card-receta',
  templateUrl: './card-receta.component.html',
  styleUrls: ['./card-receta.component.css']
})
export class CardRecetaComponent {
  @Input() receta: Receta
  @Input() usuario: Usuario

  eliminada = false

  constructor(public service: Service) { }

  usuarioConPermisos(usuario: Usuario): boolean {
    return this.receta.esEditablePor(usuario)
  }

  usuarioEsAutor(usuario: Usuario): boolean {
    return this.receta.esAutor(usuario)
  }

  async eliminarReceta(receta: Receta) {
    await this.service.eliminarReceta(receta)
    this.eliminada = true
  }

  activarEdicion(): void {
    this.service.edicionReceta = true
  }

  desactivarEdicion(): void {
    this.service.edicionReceta = false
  }

}
