import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { service } from '../../service';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

userName: String
password: String
mostrarLabelInvalido: boolean = false

  constructor(private router: Router) { }
  
  ngOnInit(): void{
  }

  onIngresar(): void{
    if(service.contieneUsuario(this.userName) && service.coincidePassword(this.userName, this.password)) {
      service.asignarUsuarioLogueado(service.buscarUsuarioPorUsername(this.userName))
      this.navegarHaciaPerfilDeUsuario()
    } else { this.mostrarLabelInvalido = true }
  }

  navegarHaciaPerfilDeUsuario(): void{
    this.router.navigate(['/perfilDeUsuario'])
  }
}
