import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'app/service';
import { Receta } from '../../../../Dominio/src/receta';

@Component({
  selector: 'app-agregar-ingrediente',
  templateUrl: './agregar-ingrediente.component.html',
  styleUrls: ['./agregar-ingrediente.component.css']
})
export class AgregarIngredienteComponent implements OnInit {

  receta : Receta

  constructor(private route: ActivatedRoute, private recetaService: Service) {
    this.route.params.subscribe((editarRecetaParameters) => {
      this.receta = this.recetaService.getRecetaById(editarRecetaParameters.recetaId)
    })
   }

  ngOnInit() {
  }

}
