import { Component, OnInit } from '@angular/core';
import { Usuario, Rutina } from '../../../../Dominio/src/usuario';
import { Service } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { Receta } from '../../../../Dominio/src/receta';
import { Alimento } from '../../../../Dominio/src/alimento';

@Component({
  selector: 'app-perfil-usuario-form',
  templateUrl: './perfil-usuario-form.component.html',
  styleUrls: ['./perfil-usuario-form.component.css']
})

export class PerfilUsuarioFormComponent implements OnInit {
  
  usuario: Usuario
  opcionesRutina: Rutina[] = ["NADA", "LEVE", "MEDIANO", "ACTIVO", "INTENSIVO"]
  opcionElegida: Rutina
  fecha: String = "2020-01-12"
  alimentosPreferidos: /* String[] */ Alimento[]
  alimentosDisgustados: /* String[] */ Alimento[]
  recetas: Receta[] = []
  recetaABuscar = ''
  isChecked = true

  constructor(private route: ActivatedRoute, private service : Service) {
    this.usuario = this.service.getUsuarioLogueado
    this.alimentosPreferidos = this./* service.parsearAlimentosAString( */service.getUsuarioLogueado.alimentosPreferidos/* ) */
    this.alimentosDisgustados = this./* service.parsearAlimentosAString( */service.getUsuarioLogueado.alimentosDisgustados/* ) */
    this.recetas = this.service.getRecetas
  }
  
  ngOnInit(): void { }

  getStatus(): String {
    if(this.usuario.imcEsSaludable()) {
      return "Estado Saludable"
    } else {return "No Saludable"}
  }

  get fechaDeNacimiento() {
    this.fecha = this.service.getFechaDeNacimiento
    return this.fecha
  }
  
}
