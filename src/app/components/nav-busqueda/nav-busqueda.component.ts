import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Service } from 'app/service';

@Component({
  selector: 'app-nav-busqueda',
  templateUrl: './nav-busqueda.component.html',
  styleUrls: ['./nav-busqueda.component.scss']
})
export class NavBusquedaComponent implements OnInit {
  @Output()
  recetaABuscar: string
  /* buttonClicked: EventEmitter<string> = new EventEmitter<string>() */

  /* recetas: Receta[] = [] */

  constructor(public service: Service) { }

  ngOnInit(): void { }

  /*
  actualizarBusqueda(recetaABuscar: string): void {
     this.recetaABuscar = recetaABuscar
  } */

  clickButton(): void {
    /* this.buttonClicked.emit(this.recetaABuscar) */
    this.service.actualizar(this.recetaABuscar)
  }

}
