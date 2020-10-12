import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  receta : Receta
  alimentos : Alimento[]
  alimentoSeleccionado  : Alimento 
  cantidad : string
  

  constructor(private route: ActivatedRoute, private service : Service) {
  }
  
  async ngOnInit() {
    /* this.alimentos=this.service.getAlimentos */
      this.route.params.subscribe(async(agregarIngredienteParameters) => {
        this.receta = await this.service.getRecetaById(agregarIngredienteParameters.recetaId)
      })
  }

  seleccionarAlimento(alimento : Alimento) {
    this.alimentoSeleccionado = alimento
    console.log(alimento.nombre)
  }
 
  agregarIngrediente() {
    let ingredienteNuevo : Ingrediente = new Ingrediente(this.alimentoSeleccionado, this.cantidad)
    this.receta.agregarIngrediente(ingredienteNuevo)
  }

  colorSeleccionado(alimento : Alimento) {
    if( this.alimentoSeleccionado == alimento){
      return "colorSeleccionado"
    }
    return ""
  }

}
