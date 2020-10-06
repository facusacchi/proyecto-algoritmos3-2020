import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private service: Service) {
    this.usuario = this.service.getUsuarioLogueado
    this.alimentos = this./* service.parsearAlimentosAString( */service.getAlimentos/* ) */
  }

  recibirAlimentoSeleccionado(valueEmitted: Alimento): void {
    this.alimento = valueEmitted
  }

  agregarAlimento(alimentoAgregar: Alimento): void {
    this.usuario.agregarAlimentoPreferido(alimentoAgregar)
    this.usuario.agregarAlimentoDisgustado(alimentoAgregar)
  }

}
