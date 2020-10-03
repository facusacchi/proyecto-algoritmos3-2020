import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'app/service';
import { Ingrediente } from '../../../../Dominio/src/ingrediente';
import { Receta } from '../../../../Dominio/src/receta';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta : Receta

  constructor(private route: ActivatedRoute, private service: Service) {
    this.route.params.subscribe((agregarIngredienteParameters) => {
      this.receta = this.service.getRecetaById(agregarIngredienteParameters.id)
    })
   }

   eliminarPaso(paso: string){
     this.receta.eliminarProcesoDePreparacion(paso)
   }

   eliminarIngrediente(ingrediente : Ingrediente) {
     this.receta.eliminarIngrediente(ingrediente)
   }

   eliminarColaborador(colaborador : Usuario) {
    this.receta.eliminarColaborador(colaborador)
  }

  ngOnInit() {
    
  
  }

  
}
