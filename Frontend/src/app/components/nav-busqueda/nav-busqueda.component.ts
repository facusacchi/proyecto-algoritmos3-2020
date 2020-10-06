import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-busqueda',
  templateUrl: './nav-busqueda.component.html',
  styleUrls: ['./nav-busqueda.component.css']
})
export class NavBusquedaComponent {

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>()
  @Output() buttonClicked2: EventEmitter<boolean> = new EventEmitter<boolean>()

  recetaABuscar: string
  isChecked: boolean

  constructor() { }

  clickButton(): void {
    this.buttonClicked.emit(this.recetaABuscar)
    this.buttonClicked2.emit(this.isChecked)
  }
  
}
