import { Component } from '@angular/core';
import { Usuario } from '../../Dominio/src/usuario';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
usuarios: Usuario[] = []

  constructor(public service: Service) { }
  
  ngOnInit(): void {
    this.usuarios = this.service.buscarUsuarios()
  } 
}