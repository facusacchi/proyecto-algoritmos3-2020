import { Component, Input, OnInit } from '@angular/core';
import { Receta } from '../../../../Dominio/src/receta';
import { Service } from 'app/service';

@Component({
  selector: 'app-card-receta',
  templateUrl: './card-receta.component.html',
  styleUrls: ['./card-receta.component.scss']
})
export class CardRecetaComponent implements OnInit {
  @Input() receta: Receta

  recetas: Receta[] = []

  constructor(public service: Service) { }

  ngOnInit(): void {
    this.recetas = this.service.buscarRecetas()
  }

}
