package tests.receta

import tp.food.overflow.Receta	
import tp.food.overflow.Ingrediente
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.assertTrue
import static org.junit.jupiter.api.Assertions.assertFalse

@DisplayName("Testeamos el metodo esValida")
class TestEsValida {
	
	Receta milanesas
	Ingrediente peceto
	
	@BeforeEach
	def void init(){
		peceto = new Ingrediente
		milanesas = new Receta
	}
	
	@Test
	@DisplayName("Una receta con al menos un ingrediente, en el rango de calorias permitido, y con al menos un paso es valida")
	def void recetaEsValida(){
		milanesas.setCalorias(1000)
		milanesas.agregarIngrediente(peceto)
		milanesas.agregarProcesoDePreparacion("Cocinar la milanga")
		assertTrue(milanesas.esValida())
	}
	
	@Test
	@DisplayName("Una receta no es valida si no posee ningun ingrediente")
	def void recetaNoEsValidaSinIngredientes(){
		milanesas.setCalorias(1000)
		milanesas.agregarProcesoDePreparacion("Cocinar la milanga")
		assertFalse(milanesas.esValida())
	}
	
	@Test
	@DisplayName("Una receta no es valida si las calorias que posee estan por fuera del rango permitido")
	def void recetaNoEsValidaConCaloriasNoPermitidas(){
		milanesas.setCalorias(5001)
		milanesas.agregarIngrediente(peceto)
		milanesas.agregarProcesoDePreparacion("Cocinar la milanga")
		assertFalse(milanesas.esValida())
	}
	
	@Test
	@DisplayName("Una receta no es valida si no posee ningun paso de preparacion")
	def void recetaNoEsValidaSinNingunPasoDePreparacon(){
		milanesas.setCalorias(1000)
		milanesas.agregarIngrediente(peceto)
		assertFalse(milanesas.esValida())
	}
	
}