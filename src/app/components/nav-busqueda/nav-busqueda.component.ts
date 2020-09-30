import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Service } from 'app/service';

@Component({
  selector: 'app-nav-busqueda',
  templateUrl: './nav-busqueda.component.html',
  styleUrls: ['./nav-busqueda.component.scss']
})
export class NavBusquedaComponent implements OnInit {

  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter<string>()

  recetaABuscar: string

  constructor(public service: Service) { }

  ngOnInit(): void { }

  clickButton(): void {
    this.buttonClicked.emit(this.recetaABuscar)
  }

}
