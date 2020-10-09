package tests.usuario

import dominio.Accion
import dominio.EditarDificultad
import dominio.EditarTitulo
import dominio.Receta
import dominio.Receta.Dificultad
import dominio.Usuario
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertThrows
import static org.junit.jupiter.api.Assertions.assertTrue

@DisplayName("Testeamos las colaboraciones")
class TestColaboraciones {
	
	Accion editarTitulo
	Accion editarDificultad
	Receta receta
	
	@BeforeEach
	def void init() {
		editarTitulo = new EditarTitulo => [ nuevoTitulo = "Saladix"]
		editarDificultad = new EditarDificultad => [ nuevaDificultad = Dificultad.FACIL]
		receta = new Receta => [
			autor = new Usuario
			nombreDelPlato = "Papas fritas"
			dificultad = Dificultad.MEDIA
			colaboradores.addAll(new Usuario, new Usuario, new Usuario)
		]
	}
	
	@Test
	@DisplayName("Un usuario que no es colaborador en una receta no puede agregar acciones a la misma")
	def void noPuedeAgregarAccion() {
		val noColaborador = new Usuario
		assertThrows(Exception, [noColaborador.crearAccion(editarTitulo, receta)])
	}
	
	@Test
	@DisplayName("Un usuario que es colaborador en una receta puede agregar acciones a la misma")
	def void puedeAgregarAccion() {
		val colaborador = new Usuario
		receta.agregarColaborador(colaborador)
		colaborador.crearAccion(editarTitulo , receta)
		assertTrue(receta.acciones.contains(editarTitulo))
	}
	
	@Test
	@DisplayName("Un usuario que no es autor de una receta no puede ejecutar acciones sobre la misma")
	def void noPuedeEjecutarAccion() {
		val noAutor = new Usuario
		assertThrows(Exception, [noAutor.ejecutarAcciones(receta)])
	}
	
	@Test
	@DisplayName("Un usuario que es autor de una receta puede ejecutar acciones sobre la misma")
	def void puedeEjecutarAcciones() {
		receta.agregarAccion(editarTitulo)
		receta.agregarAccion(editarDificultad)
		receta.autor.ejecutarAcciones(receta)
		assertEquals(Dificultad.FACIL, receta.dificultad)
		assertEquals("Saladix", receta.nombreDelPlato)
	}
	
	
}