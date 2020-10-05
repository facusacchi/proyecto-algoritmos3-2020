import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'app/service';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.css']
})
export class AgregarAlimentoComponent {

  usuarioLogueado: Usuario
  alimentos: String[]

  constructor(private route: ActivatedRoute, private service: Service) {
    this.usuarioLogueado = this.service.getUsuarioLogueado
    this.alimentos = this.service.parsearAlimentosAString(service.getAlimentos())
  }

}
