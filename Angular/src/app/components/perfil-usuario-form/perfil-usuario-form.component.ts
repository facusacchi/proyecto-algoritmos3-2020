import { Component, OnInit } from '@angular/core';
import { Usuario, Rutina } from '../../../../src-dominio/usuario';
import { Service } from '../../service';
import { Router } from '@angular/router';
import { Receta } from '../../../../src-dominio/receta';
import { Alimento } from '../../../../src-dominio/alimento';
import { Session } from 'app/session';

@Component({
  selector: 'app-perfil-usuario-form',
  templateUrl: './perfil-usuario-form.component.html',
  styleUrls: ['./perfil-usuario-form.component.css']
})

export class PerfilUsuarioFormComponent implements OnInit {

  usuario: Usuario
  opcionesRutina: Rutina[] = ["NADA", "LEVE", "MEDIANO", "ACTIVO", "INTENSIVO"]
  opcionElegida: Rutina
  alimentosPreferidos: Alimento[]
  alimentosDisgustados: Alimento[]
  recetas: Receta[] = []
  isChecked = true
  alimento: Alimento

  constructor(private router: Router, private service: Service, private session: Session) {
    this.usuario = this.session.userLogged
    this.alimentosPreferidos = this.usuario.alimentosPreferidos
    this.alimentosDisgustados = this.usuario.alimentosDisgustados
    this.session.copiaDeUsuario = Usuario.copyObject(this.usuario)
  }
  
  async ngOnInit() {
    /* try { */
      this.recetas = await this.service.todasLasRecetas()
    /* } catch (error) {
      mostrarError(this, error)
    } */
  }

  navegarHaciaHome(): void {
    this.router.navigate(['/home'])
  }

  async onAccept() {
    await this.session.actualizeUser(this.usuario)
    this.session.copiaDeUsuario = Usuario.copyObject(this.usuario)
    this.navegarHaciaHome()
  }

  async onCancel() {
    //this.session.userLogged = Usuario.copyObject(this.session.copiaDeUsuario)
    await this.session.getUser(this.session.userLogged)
    this.navegarHaciaHome()
  }

  getStatus(): String {
    if (this.usuario.esSaludable()) {
      return "Estado Saludable"
    } else { return "No Saludable" }
  }

  recibirAlimento(valueEmitted: Alimento): void {
    this.alimento = valueEmitted
    this.eliminarAlimento()
  }

  eliminarAlimento(): void {
    if (this.alimentosPreferidos.includes(this.alimento)) {
      this.usuario.eliminarAlimentoPreferido(this.alimento)
    }
    else {
      if (this.alimentosDisgustados.includes(this.alimento)) {
        this.usuario.eliminarAlimentoDisgustado(this.alimento)
      }
    }
  }

}
