import { Component, OnInit } from '@angular/core';
import { Service } from 'app/service';
import { Alimento } from '../../../../src-dominio/alimento';
import { Ingrediente } from '../../../../src-dominio/ingrediente';
import { Receta } from '../../../../src-dominio/receta';

@Component({
  selector: 'app-agregar-ingrediente',
  templateUrl: './agregar-ingrediente.component.html',
  styleUrls: ['./agregar-ingrediente.component.css']
})
export class AgregarIngredienteComponent implements OnInit {

  receta: Receta
  alimentos: Alimento[]
  alimentoSeleccionado: Alimento
  cantidad: string
  
  constructor(private service: Service) {
    this.receta = this.service.getRecetaActual
  }

  async ngOnInit() {
    this.alimentos = await this.service.todosLosAlimentos()
  }

  seleccionarAlimento(alimento: Alimento) {
    this.alimentoSeleccionado = alimento
  }

  agregarIngrediente() {
    let ingredienteNuevo: Ingrediente = new Ingrediente(this.alimentoSeleccionado, this.cantidad)
    this.receta.agregarIngrediente(ingredienteNuevo)
  }

  colorSeleccionado(alimento: Alimento) {
    if (this.alimentoSeleccionado == alimento) {
      return "colorSeleccionado"
    }
    return ""
  }

}
