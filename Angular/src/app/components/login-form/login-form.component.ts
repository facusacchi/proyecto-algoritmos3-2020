import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../session'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

userName: String
password: String
mostrarLabelInvalido: boolean = false

  constructor(private router: Router, private session: Session) { }
  
  ngOnInit(): void{
  }

  async onLogin(){
    try {
      const userDataLogin = { userName: this.userName, password: this.password }
      await this.session.loginUser(userDataLogin)
      this.navegarHaciaPerfilDeUsuario()
    }catch(error) {
      this.mostrarLabelInvalido = true
    }
  }

  navegarHaciaPerfilDeUsuario(): void {
    this.router.navigate(['/perfilDeUsuario'])
  }

  get getSession() {
    return this.session
  }
}
