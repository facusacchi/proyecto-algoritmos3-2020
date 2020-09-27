import { Component, Input, OnInit } from '@angular/core';
import { Receta } from '../../../../Dominio/src/receta';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-card-receta',
  templateUrl: './card-receta.component.html',
  styleUrls: ['./card-receta.component.scss']
})
export class CardRecetaComponent implements OnInit {

   @Input() receta: Receta

  /*  get recetaTitulo() {
    return this.receta.nombreDelPlato
  }  */

/*    receta: Receta = new Receta(new Usuario('Usuario autor de receta', 80, 1.7), 'Nombre del plato')
 */ 

  constructor() { }

  ngOnInit() {
  }

}
