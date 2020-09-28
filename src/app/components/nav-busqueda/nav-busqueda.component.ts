import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'app/service';
import { Receta } from '../../../../Dominio/src/receta';

@Component({
  selector: 'app-nav-busqueda',
  templateUrl: './nav-busqueda.component.html',
  styleUrls: ['./nav-busqueda.component.scss']
})
export class NavBusquedaComponent /* implements OnInit */ {
  @Input() recetaABuscar: string

  recetas: Receta[] = []

  constructor(public service: Service) { }

  /* ngOnInit(): void {
    this.recetas = this.service.buscarRecetas()
  } */

  /* busqueda(recetaABuscar: string): /* void Receta[] {
    /* this.recetas = this.service.busqueda(recetaABuscar) 
    return this.service.busqueda(recetaABuscar)
  } */

  actualizarBusqueda(receta: string) {
    this.recetaABuscar = receta
  }

}
