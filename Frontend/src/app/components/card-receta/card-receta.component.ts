import { Component, Input, OnInit } from '@angular/core';
import { Receta } from '../../../../Dominio/src/receta';
import { Service } from 'app/service';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-card-receta',
  templateUrl: './card-receta.component.html',
  styleUrls: ['./card-receta.component.css']
})
export class CardRecetaComponent implements OnInit {
  @Input() receta: Receta
  @Input() usuario: Usuario

  eliminada = false

  constructor(public service: Service) { }

  ngOnInit(): void { }

  usuarioConPermisos(usuario: Usuario): boolean {
    return this.receta.esEditablePor(usuario)
  }

  usuarioEsAutor(usuario: Usuario): boolean {
    return this.receta.esAutor(usuario)
  }

  eliminarReceta(receta: Receta): void {
    this.service.eliminarReceta(receta)
    this.eliminada = true
  }

}
