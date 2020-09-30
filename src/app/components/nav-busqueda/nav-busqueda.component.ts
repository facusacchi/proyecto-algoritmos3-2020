import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-busqueda',
  templateUrl: './nav-busqueda.component.html',
  styleUrls: ['./nav-busqueda.component.scss']
})
export class NavBusquedaComponent {

  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter<string>()

  recetaABuscar: string

  constructor() { }

  clickButton(): void {
    this.buttonClicked.emit(this.recetaABuscar)
  }

}
