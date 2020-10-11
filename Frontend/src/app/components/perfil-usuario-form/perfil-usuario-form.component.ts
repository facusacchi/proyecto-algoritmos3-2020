import { Component, OnInit } from '@angular/core';
import { Usuario, Rutina } from '../../../../Dominio/src/usuario';
import { Service } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { Receta } from '../../../../Dominio/src/receta';
import { Alimento } from '../../../../Dominio/src/alimento';
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
  fecha: String
  alimentosPreferidos: Alimento[]
  alimentosDisgustados: Alimento[]
  recetas: Receta[] = []
  recetaABuscar = ''
  isChecked = true
  alimento: Alimento

  constructor(private route: ActivatedRoute, private service: Service, private session: Session) {
    this.usuario = this.session.userLogged
    this.alimentosPreferidos = this.usuario.alimentosPreferidos
    this.alimentosDisgustados = this.usuario.alimentosDisgustados
  }
  
  async ngOnInit() {
    /* this.fecha = this.formatearFecha(this.usuario.fechaDeNacimiento) */
    /* try { */
      this.recetas = await this.service.todasLasRecetas()
    /* } catch (error) {
      mostrarError(this, error)
    } */
  }

  /* formatearFecha(fecha: Date): String{
    return fecha.toISOString().substring(0,10)
  } */

  getStatus(): String {
    if (this.usuario.imcEsSaludable()) {
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
