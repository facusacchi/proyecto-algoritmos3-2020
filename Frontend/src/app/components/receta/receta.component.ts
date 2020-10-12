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

  receta: Receta
  usuarioLogueado: Usuario

  constructor(private route: ActivatedRoute, private service: Service, private session: Session) {
  }
  
  async ngOnInit() {
    /* this.route.params.subscribe(async(editarRecetaParameters) => { */
      const idReceta = this.route.snapshot.params['id']
      this.receta = await this.service.getRecetaById(idReceta)
    /* }) */
    this.usuarioLogueado = this.session.userLogged
    console.log(this.receta)
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
