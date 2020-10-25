import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'app/service';
import { Alimento } from '../../../../src-dominio/alimento';
import { Usuario } from '../../../../src-dominio/usuario';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {

  @Input() encabezado: String

  @Input() elementos: Alimento[]

  @Output() buttonClicked: EventEmitter<Alimento> = new EventEmitter<Alimento>()
  @Output() buttonClicked2: EventEmitter<Alimento> = new EventEmitter<Alimento>()

  alimentoSeleccionado: Alimento
  /* usuario: Usuario */

  constructor(private router: Router, private service: Service) {
    /* this.usuario = this.service.getUsuarioLogueado */
  }

  seleccionarAlimento(alimento: Alimento): void {
    this.alimentoSeleccionado = alimento
    this.buttonClicked.emit(this.alimentoSeleccionado)
  }

  colorSeleccionado(alimento: Alimento): string {
    if (this.alimentoSeleccionado == alimento) {
      return "colorSeleccionado"
    }
    return ""
  }

  perfilDeUsuario(): boolean {
    return this.router.url == '/perfilDeUsuario'
  }

  eliminarAlimento(alimento: Alimento): void {
    this.buttonClicked2.emit(alimento)
  }

}
