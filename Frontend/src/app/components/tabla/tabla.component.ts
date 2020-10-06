import { Component, OnInit, Input } from '@angular/core';
import { Alimento } from '../../../../Dominio/src/alimento';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() encabezado: String

  @Input() elementos: String[]

  alimentoSeleccionado: Alimento

  constructor() {
  }

  ngOnInit(): void {
  }

  seleccionarAlimento(alimento: Alimento): void {
    this.alimentoSeleccionado = alimento
    /*   console.log(alimento.nombre) */
  }

  colorSeleccionado(alimento: Alimento): string {
    if (this.alimentoSeleccionado == alimento) {
      return "colorSeleccionado"
    }
    return ""
  }

}
