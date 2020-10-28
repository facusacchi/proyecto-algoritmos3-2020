import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { Ingrediente } from '../../../../src-dominio/ingrediente';
import { Receta } from '../../../../src-dominio/receta';
import { Usuario } from '../../../../src-dominio/usuario';

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

  constructor(private route: ActivatedRoute, private router: Router, private service: Service, private session: Session) {
  }

  async ngOnInit() {

    this.edicion = this.service.edicionReceta
    this.usuarioLogueado = this.session.userLogged
    const idReceta = this.route.snapshot.params['id']

    if (idReceta == "new") {
      this.receta = new Receta()
      this.receta.setearAutor(this.usuarioLogueado)
      this.edicion = true
      this.service.recetaActual = this.receta
      this.receta.id = 0
      this.service.edicionReceta = true
    }
    else {
      if (this.service.getRecetaActual != null && this.service.getRecetaActual.id == idReceta) {
        this.receta = this.service.getRecetaActual
      } else {
        this.receta = await this.service.getRecetaById(idReceta)
        this.setearRecetaActual(this.receta)
        this.recetaOld = Receta.copyObject(this.receta)
      }
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
      // this.validarReceta()
      if (this.receta.id == 0) {
        await this.service.crearReceta(this.receta) 
      }
      else {
        await this.service.actualizarReceta(this.receta)
      }
      this.navegarAHome()
    } catch (e) {
      this.errors.push(e.error)
    }
  }

  hayError(): boolean {
    return this.errors.length > 0
  }

  cancelarCambios(): void {
    this.service.actualizarRecetaActual(this.recetaOld)
    this.navegarAHome()
  }

  navegarAHome(): void {
    this.router.navigate(['/home'])
  }

  edicionActivada(): boolean {
    return this.receta.esEditablePor(this.usuarioLogueado) && this.edicion
  }

}
