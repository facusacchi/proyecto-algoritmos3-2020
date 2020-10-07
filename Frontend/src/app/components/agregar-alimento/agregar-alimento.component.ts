import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'app/service';
import { Alimento } from '../../../../Dominio/src/alimento';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.css']
})
export class AgregarAlimentoComponent {

  usuario: Usuario
  alimentos: /* String[] */ Alimento[]
  alimento: Alimento

  constructor(private route: Router, private service: Service) {
    this.usuario = this.service.getUsuarioLogueado
    this.alimentos = this./* service.parsearAlimentosAString( */service.getAlimentos/* ) */
  }

  recibirAlimentoSeleccionado(valueEmitted: Alimento): void {
    this.alimento = valueEmitted
    /* console.log(this.alimento) */
  }

  agregarAlimento(alimentoAgregar: Alimento): void {
    if (this.alimentoPreferido()) {
      this.usuario.agregarAlimentoPreferido(alimentoAgregar)
    }
    else {
      this.usuario.agregarAlimentoDisgustado(alimentoAgregar)
    }
  }

  alimentoPreferido(): boolean {
    return this.route.url == '/agregarAlimentoPreferido'
  }

}
