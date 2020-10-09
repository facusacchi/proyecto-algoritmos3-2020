package componente.observadores

import dominio.Receta
import dominio.Usuario

abstract class Observador {
	
	protected Usuario sujeto
	
	def void actualizar(Receta receta) 
}