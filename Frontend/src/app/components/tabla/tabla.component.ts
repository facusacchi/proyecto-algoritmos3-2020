import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alimento } from '../../../../Dominio/src/alimento';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() encabezado: String

  @Input() elementos: /* String[] */ Alimento[]

  @Output() buttonClicked: EventEmitter<Alimento> = new EventEmitter<Alimento>() /* EventEmitter<String> = new EventEmitter<String>() */

  alimentoSeleccionado: Alimento

  constructor() {
  }

  ngOnInit(): void {
  }

  seleccionarAlimento(alimento: Alimento): void {
    this.alimentoSeleccionado = alimento
    /* console.log(this.alimentoSeleccionado) */
    this.buttonClicked.emit(this.alimentoSeleccionado)
  }

  colorSeleccionado(alimento: Alimento): string {
    if (this.alimentoSeleccionado == alimento) {
      return "colorSeleccionado"
    }
    return ""
  }

}
