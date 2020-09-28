import { Component, OnInit } from '@angular/core';
import { Receta } from '../../../../Dominio/src/receta';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta : Receta

  constructor() { }

  ngOnInit() {
  }

}
