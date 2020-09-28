import { Component } from '@angular/core';
import { Receta } from '../../Dominio/src/receta';
import { Usuario } from '../../Dominio/src/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuarios: Usuario[] = []
  recetas: Receta[] = []

  constructor() { }

  ngOnInit(): void {

  }
}