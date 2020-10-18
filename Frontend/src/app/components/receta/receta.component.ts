import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  edicion: boolean
  errors = []
  receta: Receta
  recetaOld: Receta
  /* nuevaReceta = false */

  constructor(private route: ActivatedRoute, private router: Router, private service: Service, private session: Session) {
  }

  async ngOnInit() {
    this.edicion = this.service.edicionReceta
    this.usuarioLogueado = this.session.userLogged
    const idReceta = this.route.snapshot.params['id']
    if (this.service.getRecetaActual != null && this.service.getRecetaActual.id == idReceta) {
      this.receta = this.service.getRecetaActual
    } else {
      this.receta = await this.service.getRecetaById(idReceta)
      this.setearRecetaActual(this.receta)
      this.recetaOld = Receta.copyObject(this.receta)
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

  setearRecetaActual(receta: Receta): void {
    this.service.recetaActual = receta
  }

  async guardarCambios() {
    try {
      this.errors = []
      this.validarReceta()
      await this.service.actualizarReceta(this.receta)
      this.navegarAHome()
    } catch (e) {
      this.errors.push(e.error)
    }
  }

  validarReceta() {
    if (!this.receta.esValida()) {
      if (!this.receta.validarProcesoDePreparacion()) {
        throw { error: 'La receta no tiene pasos' }
      }
      if (!this.receta.validarCalorias()) {
        throw { error: 'Las calorias deben estar en 10 y 5000' }
      }
      if (!this.receta.validarIngredientes()) {
        throw { error: 'La receta no tiene ingredientes' }
      }
    }
  }

  hayError(): boolean {
    return this.errors.length > 0
  }

  cancelarCambios(): void {
    /* if (!this.nuevaReceta) { */
    this.service.actualizarRecetaActual(this.recetaOld)
    /*  } */
    this.navegarAHome()
  }

  navegarAHome(): void {
    this.router.navigate(['/home'])
  }

  edicionActivada(): boolean {
    return this.receta.esEditablePor(this.usuarioLogueado) && this.edicion
  }

}
