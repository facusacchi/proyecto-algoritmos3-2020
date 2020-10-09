package dominio

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Ingrediente {
	
	Alimento alimento
	String cantidad
	
	def condicionesInadecuadasIngrediente(){
		alimento.condicionesInadecuadas
	}
}
