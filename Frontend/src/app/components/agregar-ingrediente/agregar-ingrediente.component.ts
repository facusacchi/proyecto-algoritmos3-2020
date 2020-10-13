import { Component, OnInit } from '@angular/core';
import { Service } from 'app/service';
import { Alimento } from '../../../../Dominio/src/alimento';
import { Ingrediente } from '../../../../Dominio/src/ingrediente';
import { Receta } from '../../../../Dominio/src/receta';

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
    /* console.log(this.receta) */
  }

  seleccionarAlimento(alimento: Alimento) {
    this.alimentoSeleccionado = alimento
    /* console.log(alimento.nombre) */
  }

  agregarIngrediente() {
    let ingredienteNuevo: Ingrediente = new Ingrediente(this.alimentoSeleccionado, this.cantidad)
    this.receta.agregarIngrediente(ingredienteNuevo)
    /* console.log(this.receta) */
  }

  colorSeleccionado(alimento: Alimento) {
    if (this.alimentoSeleccionado == alimento) {
      return "colorSeleccionado"
    }
    return ""
  }

}
