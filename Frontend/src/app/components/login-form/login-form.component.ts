import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service';
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
    const userDataLogin = { userName: this.userName, password: this.password }
    const userLogged = await this.session.loginUser(userDataLogin)
    if(userLogged === null) {
      this.mostrarLabelInvalido = true
    }else{
      this.navegarHaciaPerfilDeUsuario()
    }
  }

  navegarHaciaPerfilDeUsuario(): void {
    this.router.navigate(['/perfilDeUsuario'])
  }
}
