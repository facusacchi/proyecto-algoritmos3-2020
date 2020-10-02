import { Component, OnInit } from '@angular/core';
import { Usuario, Rutina } from '../../../../Dominio/src/usuario';
import { service } from '../../service';
import { ActivatedRoute } from '@angular/router';
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
  /* alimentosPreferidos: Alimento[]
  alimentosPreferidosParseados: String[] */
  alimentosPreferidos: String[]
  constructor(private route: ActivatedRoute) {
    this.usuario = service.getUsuarioLogueado
    /* this.alimentosPreferidos = service.getUsuarioLogueado.alimentosPreferidos */
    this.alimentosPreferidos = service.parsearAlimentosAString(service.getUsuarioLogueado.alimentosPreferidos)
  }
  
  ngOnInit(): void {
  }

/*   parsearAlimentosAString(): String[]{
    const alimentos: String[] = []
    this.alimentosPreferidos.forEach(alimento => alimentos.push(alimento.nombre))
    return alimentos
  } */

  getStatus(): String {
    if(this.usuario.imcEsSaludable()) {
      return "Estado Saludable"
    } else {return "No Saludable"}
  }

  get fechaDeNacimiento() {
    this.fecha = service.getFechaDeNacimiento
    return this.fecha
  }
  
}
