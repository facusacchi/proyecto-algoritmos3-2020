import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css', './../../app.component.css']
})
export class PrimaryButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nombre: string = 'Ingresar'
  status: string = 'No logueado'

  loguearse() {
    this.status = 'Te has logueado correctamente!'
  }
}
