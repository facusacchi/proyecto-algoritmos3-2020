package tests.receta

import tp.food.overflow.Usuario				
import tp.food.overflow.Receta
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.assertFalse
import static org.junit.jupiter.api.Assertions.assertTrue

@DisplayName("Testeamos el metodo esEditable")
class TestEsEditable {

	Usuario usuarioAutorDeReceta
	Usuario usuarioColaboradorDeReceta
	Usuario usuarioQueNoParticipaDeReceta
	Receta pastelDePapa

	@BeforeEach
	def void init() {
		usuarioAutorDeReceta = new Usuario
		usuarioColaboradorDeReceta = new Usuario
		usuarioQueNoParticipaDeReceta = new Usuario
		pastelDePapa = new Receta() => [
			autor = usuarioAutorDeReceta
			agregarColaborador(usuarioAutorDeReceta)
			agregarColaborador(usuarioColaboradorDeReceta)
		]
	}

	@Test
	@DisplayName("Toda receta puede ser editable por su autor")
	def void recetaEsEditablePorSuAutor() {
		assertTrue(
			pastelDePapa.esEditablePor(usuarioAutorDeReceta)
		)
	}

	@Test
	@DisplayName("Toda receta puede ser editable por un colaborador de ella")
	def void recetaEsEditablePorUnColaborador() {
		assertTrue(pastelDePapa.esEditablePor(usuarioColaboradorDeReceta))
	}

	@Test
	@DisplayName("Todo usuario que no sea autor ni colaborador no puede editar la receta")
	def void recetaEsEditablePorUnUsuario() {
		assertFalse(pastelDePapa.esEditablePor(usuarioQueNoParticipaDeReceta))
	}
}
