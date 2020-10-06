package tests.usuario

import org.junit.jupiter.api.DisplayName	
import tp.food.overflow.Receta
import tp.food.overflow.RecetaCompuesta
import org.junit.jupiter.api.Test
import tp.food.overflow.Usuario
import static org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach

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
