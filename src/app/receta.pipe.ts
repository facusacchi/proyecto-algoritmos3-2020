import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../../Dominio/src/receta';
import { Usuario } from '../../Dominio/src/usuario';

@Pipe({
  name: 'recetaFilter'
})

export class RecetaPipe implements PipeTransform {

  transform(recetas: Receta[], recetaABuscar: string, isChecked: boolean, usuarioLogueado: Usuario): Receta[] {
    if (isChecked) {
      return recetas.filter(receta => (!recetaABuscar || receta.cumpleCondicionDeBusqueda(recetaABuscar.toLowerCase())) && receta.esAutor(usuarioLogueado))
    }
    else {
      return recetas.filter(receta => !recetaABuscar || receta.cumpleCondicionDeBusqueda(recetaABuscar.toLowerCase()))
    }
  }

}
