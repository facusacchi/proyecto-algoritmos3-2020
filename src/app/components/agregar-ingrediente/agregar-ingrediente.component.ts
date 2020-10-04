import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'app/service';
import { Alimento } from '../../../../Dominio/src/alimento';
import { Receta } from '../../../../Dominio/src/receta';

@Component({
  selector: 'app-agregar-ingrediente',
  templateUrl: './agregar-ingrediente.component.html',
  styleUrls: ['./agregar-ingrediente.component.css']
})
export class AgregarIngredienteComponent implements OnInit {

  receta : Receta
  alimentos : Alimento[]

  constructor(private route: ActivatedRoute, private service : Service) {
    this.route.params.subscribe((agregarIngredienteParameters) => {
      this.receta = this.service.getRecetaById(agregarIngredienteParameters.recetaId)
    })
  }

  ngOnInit() {
    this.alimentos=this.service.getAlimentos()
  }

}
