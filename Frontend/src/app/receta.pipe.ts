import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../../src-dominio/receta';
import { Usuario } from '../../src-dominio/usuario';

@Pipe({
  name: 'recetaFilter'
})

export class RecetaPipe implements PipeTransform {

  transform(recetas: Receta[], /* recetaABuscar: string, */ isChecked: boolean, usuario: Usuario): Receta[] {
    if (isChecked) {
      return recetas.filter(receta => /*( !recetaABuscar || receta.cumpleCondicionDeBusqueda(recetaABuscar.toLowerCase())) && */ receta.esEditablePor(usuario))
    }
    else {
      return recetas
      /* return recetas.filter(receta => !recetaABuscar || receta.cumpleCondicionDeBusqueda(recetaABuscar.toLowerCase())) */
    }
  }

}
