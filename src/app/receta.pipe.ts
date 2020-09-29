import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../../Dominio/src/receta';

@Pipe({
  name: 'recetaFilter'
})
export class RecetaPipe implements PipeTransform {

  transform(recetas: Receta[], recetaABuscar: string): Receta[] {
    recetaABuscar = recetaABuscar.toLowerCase()
    return recetas.filter(receta => !recetaABuscar || receta.cumpleCondicionDeBusqueda(recetaABuscar))}
 /* return recetas.filter(receta => !recetaABuscar || this.coincide(receta.nombreDelPlato, recetaABuscar) || this.coincide(receta.ingredientes, recetaABuscar)) 
 
 coincide(valor1: string, valor2: string) {
    return valor1
      .toLowerCase()
      .match(valor2.toLowerCase())
  } */
}
