import { Component, OnInit } from '@angular/core';
import { Service } from 'app/service';
import { Receta } from '../../../../src-dominio/receta';

@Component({
  selector: 'app-agregar-paso',
  templateUrl: './agregar-paso.component.html',
  styleUrls: ['./agregar-paso.component.css']
})
export class AgregarPasoComponent implements OnInit {

  receta: Receta
  paso: string

  constructor(private service: Service) {
    this.receta = this.service.getRecetaActual
  }

  ngOnInit() {
  }

  agregarPaso(paso: string) {
    this.receta.agregarProcesoDePreparacion(paso)
  }

}
