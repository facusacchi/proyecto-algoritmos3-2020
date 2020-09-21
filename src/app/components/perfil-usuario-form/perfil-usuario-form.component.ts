import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../Dominio/src/usuario';
@Component({
  selector: 'app-perfil-usuario-form',
  templateUrl: './perfil-usuario-form.component.html',
  styleUrls: ['./perfil-usuario-form.component.css']
})
export class PerfilUsuarioFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  usuario: Usuario = new Usuario("Pepe Palala", 95, 175, [], null, null)
  status: String = "Estado Saludable" /* falta validar, si es saludable o no, cambiaria el string del status */

  
}
