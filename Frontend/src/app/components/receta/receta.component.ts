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

  receta: Receta
  usuarioLogueado: Usuario

  constructor(private route: ActivatedRoute, private service: Service) {
    this.route.params.subscribe((editarRecetaParameters) => {
      this.receta = this.service.getRecetaById(editarRecetaParameters.id)
    })
  }

  ngOnInit() {
    this.usuarioLogueado = this.service.usuarioLogueado
  }

  eliminarPaso(paso: string) {
    this.receta.eliminarProcesoDePreparacion(paso)
  }

  eliminarIngrediente(ingrediente: Ingrediente) {
    this.receta.eliminarIngrediente(ingrediente)
  }

  eliminarColaborador(colaborador: Usuario) {
    this.receta.eliminarColaborador(colaborador)
  }

  guardarCambios() {
    this.service.guardarCambiosReceta(this.receta)
  }



}
