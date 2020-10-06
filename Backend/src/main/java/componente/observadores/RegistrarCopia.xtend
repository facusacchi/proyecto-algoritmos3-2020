package componente.observadores

import tp.food.overflow.Receta.Dificultad
import tp.food.overflow.Usuario
import tp.food.overflow.Receta
import java.util.HashMap
import java.util.Map
import repos.RepoReceta
import org.eclipse.xtend.lib.annotations.Accessors
import java.util.List

@Accessors
class RegistrarCopia extends Observador {
	
	static Map<Dificultad, Integer> dificultades = new HashMap<Dificultad, Integer>
	static Map<Usuario, Integer> autores = new HashMap<Usuario, Integer>
	static Map<Usuario, Integer> usuariosSinRecetasPropias = new HashMap<Usuario, Integer>
	List<Estadistica> estadisticas
	
	new(Usuario sujeto) {
		this.sujeto = sujeto
		this.sujeto.agregarObservador(this)
		estadisticas = #[new EstadisticaDificultad, new EstadisticaAutor, new EstadisticaUserSinReceta(sujeto)]
	}
	
	override actualizar(Receta receta) {
		estadisticas.forEach[actualizar(receta)]
	}
	
	static def getDificultades() {
		dificultades
	}
	
	static def getAutores() {
		autores
	}
	
	static def getUsuariosSinRecetasPropias() {
		usuariosSinRecetasPropias
	}
}

abstract class Estadistica {
	
	def boolean contieneEstadistica(Receta receta)
	def void agregarEstadistica(Receta receta)
	def void aumentarValorDeEstadistica(Receta receta)
	
	def actualizar(Receta receta) {				//template method
		if(!contieneEstadistica(receta)) {
			agregarEstadistica(receta)
		}
		aumentarValorDeEstadistica(receta)
	}
}

class EstadisticaDificultad extends Estadistica {
	
	override contieneEstadistica(Receta receta) {
		RegistrarCopia.dificultades.containsKey(receta.dificultad)
	}
	
	override agregarEstadistica(Receta receta) {
		RegistrarCopia.dificultades.put(receta.dificultad, 0)
	}
	
	override aumentarValorDeEstadistica(Receta receta) {
		RegistrarCopia.dificultades.put(receta.dificultad, RegistrarCopia.dificultades.get(receta.dificultad)+1)
	}
	
	static def getCantidadDeCopias(Dificultad dificultad) {
		RegistrarCopia.dificultades.get(dificultad)
	}
	
}

class EstadisticaAutor extends Estadistica {
	
	override contieneEstadistica(Receta receta) {
		RegistrarCopia.autores.containsKey(receta.autor)
	}
	
	override agregarEstadistica(Receta receta) {
		RegistrarCopia.autores.put(receta.autor, 0)
	}
	
	override aumentarValorDeEstadistica(Receta receta) {
		RegistrarCopia.autores.put(receta.autor, RegistrarCopia.autores.get(receta.autor)+1)
	}
	
	static def getCantidadDeCopias(Usuario autor) {
		RegistrarCopia.autores.get(autor)
	}
	
}

@Accessors
class EstadisticaUserSinReceta extends Estadistica {
	
	Usuario sujeto
	static RepoReceta repoRecetas
	
	new(Usuario sujeto) {
		this.sujeto = sujeto
	}
	
	override contieneEstadistica(Receta receta) {
		RegistrarCopia.usuariosSinRecetasPropias.containsKey(sujeto)
	}
	
	override agregarEstadistica(Receta receta) {
		RegistrarCopia.usuariosSinRecetasPropias.put(sujeto, 0)
	}

	override aumentarValorDeEstadistica(Receta receta) {
		RegistrarCopia.usuariosSinRecetasPropias.put(sujeto, RegistrarCopia.usuariosSinRecetasPropias.get(sujeto)+1)
	}
	
	static def getCantidadDeCopias(Usuario user) {
		RegistrarCopia.usuariosSinRecetasPropias.get(user)
	}

	override actualizar(Receta receta) {
		if(!esAutor) {
			super.actualizar(receta)
		}		
	}
	
	def esAutor() {
		repoRecetas.contieneAutor(sujeto)
	}
	
	static def setRepoRecetas(RepoReceta repo) {
		repoRecetas = repo
	}
}