import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../Dominio/src/usuario';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil-usuario-form',
  templateUrl: './perfil-usuario-form.component.html',
  styleUrls: ['./perfil-usuario-form.component.css']
})
export class PerfilUsuarioFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  usuario: Usuario = new Usuario("Pepe Palala", 95, 1.75, [], new Date(1991, 1, 28), [], null)
  status: String = "Estado Saludable" /* falta validar, si es saludable o no, cambiaria el string del status */

}
