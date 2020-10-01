import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'app/service';
import { Receta } from '../../../../Dominio/src/receta';

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

  ngOnInit() {
    
  
  }

  
}
