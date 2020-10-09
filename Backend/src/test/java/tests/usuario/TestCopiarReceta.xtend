package tests.usuario

import dominio.Receta
import dominio.RecetaCompuesta
import dominio.Usuario
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo copiarReceta")
class TestCopiarReceta {

	Receta recetaSimple
	Receta copiaDeRecetaSimple
	Receta copiaDeRecetaCompuesta
	RecetaCompuesta recetaCompuesta
	Usuario userCopiador
	Usuario userAutor
	Usuario userColaborador

	@BeforeEach
	def void init() {
		recetaSimple = new Receta() => [
			autor = userAutor
			colaboradores.add(userColaborador)
		]

		recetaCompuesta = new RecetaCompuesta
		userCopiador = new Usuario
		userAutor = new Usuario
		userColaborador = new Usuario
	}
	
	@Test
	@DisplayName("Una receta copiada no es la misma que la original, la original se mantiene")
	def void recetaNoEsSuCopia() {
		assertNotEquals(recetaSimple, userCopiador.copiarReceta(recetaSimple))
	}

	@Test
	@DisplayName("Una receta simple copiada por un usuario cambia en su autor, que pasa a ser quien la copia, y su lista de colaboradores pasa a estar vacia")
	def void copiamosUnaRecetaSimple() {
		copiaDeRecetaSimple = userCopiador.copiarReceta(recetaSimple)
		assertTrue(copiaDeRecetaSimple.colaboradores.isEmpty)
		assertEquals(userCopiador, copiaDeRecetaSimple.autor)
	}

	@Test
	@DisplayName("Una receta compuesta copiada por un usuario cambia en su autor, que pasa a ser quien la copia, y su lista de colaboradores pasa a estar vacia")
	def void copiamosUnaRecetaCompuesta() {
		copiaDeRecetaCompuesta = userCopiador.copiarReceta(recetaCompuesta)
		assertTrue(copiaDeRecetaCompuesta.colaboradores.isEmpty)
		assertEquals(userCopiador, copiaDeRecetaCompuesta.autor)
	}
	
	@Test
	@DisplayName("Una receta copiada debe tener su respectiva receta original")
	def void copiaTieneSuRecetaOriginal() {
		copiaDeRecetaSimple = userCopiador.copiarReceta(recetaSimple)
		assertEquals(recetaSimple, copiaDeRecetaSimple.recetaOriginal)
	}
}
