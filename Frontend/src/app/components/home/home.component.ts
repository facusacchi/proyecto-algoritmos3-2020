import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from '../../../../Dominio/src/receta';
import { Service } from 'app/service';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recetaABuscar = ''
  isChecked = false
  recetas: Receta[] = []
  usuarioLogueado: Usuario

  constructor(private router: Router, public service: Service) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.service.getUsuarioLogueado
    this.recetas = this.service.buscarRecetas()
  }

  recibirRecetaABuscar(valueEmitted: string): void {
    this.recetaABuscar = valueEmitted
  }

  recibirEstadoCheckbox(valueEmitted: boolean): void {
    this.isChecked = valueEmitted
  }

}
