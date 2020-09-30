import { Component } from '@angular/core';
import { Usuario } from '../../Dominio/src/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuarios: Usuario[] = []

  constructor() { }

  ngOnInit(): void {

  }
}