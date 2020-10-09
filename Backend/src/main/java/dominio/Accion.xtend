package dominio

import dominio.Receta.Dificultad
import org.eclipse.xtend.lib.annotations.Accessors

abstract class Accion {
	
	Receta recetaClonada
	Receta recetaOriginal
	
	def void ejecutar(Receta receta) {
		recetaClonada = receta.clonar()
		recetaOriginal = receta
		doEjecutar(receta)
	}
	
	def void doEjecutar(Receta receta)
	
	def void revetirAccion() {
		recetaOriginal.copiarDesde(recetaClonada)
	}
	
}

class EditarTitulo extends Accion {
	
	@Accessors String nuevoTitulo
	
	override doEjecutar(Receta receta) {
		receta.nombreDelPlato = nuevoTitulo
	}
	
}

class EditarDificultad extends Accion {
	
	@Accessors Dificultad nuevaDificultad
	
	override doEjecutar(Receta receta) {
		receta.setDificultad(nuevaDificultad)
	}
	
}

class AgregarColaborador extends Accion {
	
	@Accessors Usuario nuevoColaborador
	
	override doEjecutar(Receta receta) {
		receta.agregarColaborador(nuevoColaborador)
	}
	
}

class EliminarPaso extends Accion {
	
	@Accessors String procesoDePreparacion
	
	override doEjecutar(Receta receta) {
		receta.eliminarProcesoDePreparacion(procesoDePreparacion)
	}
	
}
