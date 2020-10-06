package tests.receta

import tp.food.overflow.RecetaCompuesta
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Receta
import tp.food.overflow.Receta.Dificultad
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.assertEquals

@DisplayName("Testeamos las recetas compuestas")
class TestRecetaCompuesta {
	
	RecetaCompuesta recetaCompuesta
	Receta recetaFacil
	Receta recetaMedia
	Receta recetaDificil
	
	@BeforeEach
	def void init() {
		recetaFacil = new Receta => [
			dificultad = Dificultad.FACIL
			calorias = 100
		]
		recetaMedia = new Receta => [
			dificultad = Dificultad.MEDIA
			calorias = 200
		]
		recetaDificil = new Receta => [
			dificultad = Dificultad.DIFICIL
			calorias = 300
		]
		
		recetaCompuesta = new RecetaCompuesta => [
			subrecetas.addAll(recetaFacil,recetaDificil,recetaMedia)
		]
	}
	
	@Test
	@DisplayName("Una receta compuesta por subrecetas con dificultad facil, media y dificil su dificultad es dificil")
	def void recetaCompuestaDificil() {
		recetaCompuesta.subrecetas.addAll(recetaFacil,recetaMedia)
		assertEquals(Dificultad.DIFICIL, recetaCompuesta.dificultad)
	}
	
	@Test
	@DisplayName("Una receta compuesta suma todas las calorias de las subrecetas")
	def void recetaCompuestaTotalCalorias() {
		assertEquals(600, recetaCompuesta.calorias)
	}
}