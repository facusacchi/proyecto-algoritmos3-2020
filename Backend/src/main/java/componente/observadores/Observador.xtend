package componente.observadores

import tp.food.overflow.Usuario
import tp.food.overflow.Receta

abstract class Observador {
	
	protected Usuario sujeto
	
	def void actualizar(Receta receta) 
}