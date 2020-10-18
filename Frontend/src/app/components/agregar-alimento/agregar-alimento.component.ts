import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { Alimento } from '../../../../Dominio/src/alimento';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.css']
})
export class AgregarAlimentoComponent implements OnInit{

  usuario: Usuario
  alimentos:  Alimento[]
  alimento: Alimento

  constructor(private route: Router, private service: Service, private session: Session) {
  }

  async ngOnInit() {
    this.usuario = this.session.userLogged
    /* try { */
      this.alimentos = await this.service.todosLosAlimentos()
    /* } catch (error) {
      mostrarError(this, error)
    } */
  }

  recibirAlimentoSeleccionado(valueEmitted: Alimento): void {
    this.alimento = valueEmitted
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
