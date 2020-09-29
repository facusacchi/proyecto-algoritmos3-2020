import { Component, OnInit } from '@angular/core';
import { Usuario, Rutina } from '../../../../Dominio/src/usuario';
import { service } from '../../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario-form',
  templateUrl: './perfil-usuario-form.component.html',
  styleUrls: ['./perfil-usuario-form.component.css']
})
export class PerfilUsuarioFormComponent implements OnInit {
  
  usuario: Usuario
  opcionesRutina: Rutina[] = ["NADA", "LEVE", "MEDIANO", "ACTIVO", "INTENSIVO"]
  opcionElegida: Rutina

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(parametro => {
      this.usuario = service.buscarUsuarioPorId(parametro['id'])
    })
    this.opcionElegida = this.usuario.rutina
  }

  getStatus(): String {
    if(this.usuario.imcEsSaludable()) {
      return "Estado Saludable"
    } else {return "No Saludable"}
  }

  ngOnInit(): void {
  }


}
