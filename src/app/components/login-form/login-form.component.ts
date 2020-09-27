import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { service } from '../../service'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

userName: String
password: String

  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  /* navegarHaciaHome() {
    
  } */

  navegarHaciaPerfilUsuario(): void {
    this.router.navigate(['/perfilDeUsuario'])
  }
}
