package tests.usuario

import tp.food.overflow.Usuario
import tp.food.overflow.Receta
import componente.observadores.RegistrarCopia
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Receta.Dificultad
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import static org.junit.jupiter.api.Assertions.*
import repos.RepoReceta
import componente.observadores.EstadisticaUserSinReceta
import componente.observadores.EstadisticaDificultad
import componente.observadores.EstadisticaAutor

class TestRegistrarCopiaObserver {
	
	Usuario userQueCopia
	Usuario otroUserQueCopia
	Usuario userQueQuitaremosObserver
	Usuario unAutor
	Receta recetaFacil
	Receta recetaMedia
	Receta recetaDificil
	Receta recetaConAutor
	RepoReceta unRepoDeRecetas = RepoReceta.instance
	RegistrarCopia registrarCopia
	RegistrarCopia registrarCopiaDelOtroUser
	RegistrarCopia observerQueSeraQuitado
	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		userQueCopia = new Usuario
		otroUserQueCopia = new Usuario
		userQueQuitaremosObserver = new Usuario
		unAutor = new Usuario
		recetaFacil = new Receta() => [
			dificultad = Dificultad.FACIL
		]
		recetaMedia = new Receta() => [
			dificultad = Dificultad.MEDIA
		]
		recetaDificil = new Receta() => [
			dificultad = Dificultad.DIFICIL
		]
		recetaConAutor = new Receta() => [
			autor = unAutor
		]
		registrarCopia = new RegistrarCopia(userQueCopia)		
		registrarCopiaDelOtroUser = new RegistrarCopia(otroUserQueCopia)
		observerQueSeraQuitado = new  RegistrarCopia(userQueQuitaremosObserver)
		
		unRepoDeRecetas.create(recetaFacil)
		unRepoDeRecetas.create(recetaMedia)
		unRepoDeRecetas.create(recetaDificil)
		unRepoDeRecetas.create(recetaConAutor)
		EstadisticaUserSinReceta.setRepoRecetas(unRepoDeRecetas)
	}

	@Test
	@DisplayName("Cuando una receta es copiada, aumenta en uno el tipo de dificultad registrada")
	def void aumentaUnaDificultadCuandoSeCopiaReceta() {
		userQueCopia.copiarReceta(recetaFacil)
		userQueCopia.copiarReceta(recetaMedia)
		userQueCopia.copiarReceta(recetaMedia)
		userQueCopia.copiarReceta(recetaDificil)
		userQueCopia.copiarReceta(recetaDificil)
		userQueCopia.copiarReceta(recetaDificil)
		assertEquals(1, EstadisticaDificultad.getCantidadDeCopias(Dificultad.FACIL))
		assertEquals(2, EstadisticaDificultad.getCantidadDeCopias(Dificultad.MEDIA))
		assertEquals(3, EstadisticaDificultad.getCantidadDeCopias(Dificultad.DIFICIL))
	}
	
	@Test
	@DisplayName("Cuando una receta es copiada, aumenta en uno la cantidad de copias registradas del autor de dicha receta")
	def void autorAumentaEnUnoAlEfectuarCopia() {
		userQueCopia.copiarReceta(recetaConAutor)
		userQueCopia.copiarReceta(recetaConAutor)
		assertEquals(2, EstadisticaAutor.getCantidadDeCopias(unAutor))
	}
	
	@Test
	@DisplayName("Cuando una receta es copiada, aumenta en uno la cantidad de copias registradas de un usuario si y solo si dicho usuario no posee recetas propias")
	def void userSinRecetasPropiasAumentaEnUnoAlEfectuarCopia() {
		otroUserQueCopia.copiarReceta(recetaConAutor)
		unAutor.copiarReceta(recetaConAutor)
		assertEquals(1, EstadisticaUserSinReceta.getCantidadDeCopias(otroUserQueCopia))
		assertNull(EstadisticaUserSinReceta.getCantidadDeCopias(unAutor))
	}

	@Test
	@DisplayName("Cuando quitamos el observer de la lista, no se registra ninguna copia")
	def void noSeRegistraCopia() {
		userQueQuitaremosObserver.quitarObservador(observerQueSeraQuitado)
		userQueQuitaremosObserver.copiarReceta(recetaConAutor)
		assertNull(EstadisticaAutor.getCantidadDeCopias(unAutor))		
	}
}