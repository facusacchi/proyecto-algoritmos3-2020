import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { Ingrediente } from '../../../../Dominio/src/ingrediente';
import { Receta } from '../../../../Dominio/src/receta';
import { Usuario } from '../../../../Dominio/src/usuario';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  usuarioLogueado: Usuario
  receta: Receta
  recetaOld: Receta
  /* nuevaReceta = false */

  constructor(private route: ActivatedRoute, private service: Service, private session: Session) {
  }

  async ngOnInit() {
    /* this.route.params.subscribe(async(editarRecetaParameters) => {
      console.log(editarRecetaParameters.id)
      this.receta = await this.service.getRecetaById(editarRecetaParameters.id)
    }) */
    this.usuarioLogueado = this.session.userLogged
    const idReceta = this.route.snapshot.params['id']
    if (this.service.getRecetaActual != null && this.service.getRecetaActual.id == idReceta) {
      this.receta = this.service.getRecetaActual
    } else {
      this.receta = await this.service.getRecetaById(idReceta)
      this.setearRecetaActual(this.receta)
      this.recetaOld = Object.assign(new Receta, this.receta)
    }
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

  setearRecetaActual(receta: Receta): void {
    this.service.recetaActual = receta
  }

}
