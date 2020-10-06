package tests.repoReceta

import org.junit.jupiter.api.DisplayName			
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Receta
import org.junit.jupiter.api.Test
import repos.RepoReceta
import static org.junit.jupiter.api.Assertions.*
import tp.food.overflow.Usuario
import tp.food.overflow.Ingrediente
import tp.food.overflow.Alimento
import tp.food.overflow.Hipertenso
import java.util.HashSet

@DisplayName("Testeamos el metodo de sugerencia (individual)")
class TestSugerencia {
	
	RepoReceta repositorioDeRecetas = RepoReceta.instance
	Receta recetaConIngredienteAdecuadoYDisgustado
	Receta recetaConIngredienteAdecuadoYGustado
	Receta recetaConIngredienteInadecuadoYGustado
	Ingrediente ingredienteAdecuadoYGustado
	Ingrediente ingredienteInadecuadoYGustado
	Ingrediente ingredienteAdecuadoYDisgustado
	Alimento alimentoAdecuadoYGustado
	Alimento alimentoInadecuadoYGustado
	Alimento alimentoAdecuadoYDisgustado
	Usuario user
	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		alimentoAdecuadoYGustado = new Alimento
		alimentoInadecuadoYGustado = new Alimento
		alimentoAdecuadoYDisgustado = new Alimento
		user = new Usuario
		ingredienteAdecuadoYGustado = new Ingrediente() => [
			alimento = alimentoAdecuadoYGustado
		]
		ingredienteInadecuadoYGustado = new Ingrediente() => [
			alimento = alimentoInadecuadoYGustado
		]
		ingredienteAdecuadoYDisgustado = new Ingrediente() => [
			alimento = alimentoAdecuadoYDisgustado
		]
		recetaConIngredienteAdecuadoYDisgustado = new Receta
		recetaConIngredienteInadecuadoYGustado = new Receta
		recetaConIngredienteAdecuadoYGustado = new Receta
		
		alimentoInadecuadoYGustado.agregarCondicionInadecuada(Hipertenso.getInstancia)
		user.agregarCondicionAlimenticia(Hipertenso.getInstancia)
		user.agregarAlimentoDisgustado(alimentoAdecuadoYDisgustado)
		recetaConIngredienteAdecuadoYDisgustado.agregarIngrediente(ingredienteAdecuadoYDisgustado)
		recetaConIngredienteInadecuadoYGustado.agregarIngrediente(ingredienteInadecuadoYGustado)
		recetaConIngredienteAdecuadoYGustado.agregarIngrediente(ingredienteAdecuadoYGustado)
	}
	
	@Test
	@DisplayName("Una receta con ingredientes gustados y condiciones adecuadas para el usuario es sugerida")
	def void recetaEsSugerida() {
		repositorioDeRecetas.create(recetaConIngredienteAdecuadoYGustado)
		repositorioDeRecetas.create(recetaConIngredienteInadecuadoYGustado)
		repositorioDeRecetas.create(recetaConIngredienteAdecuadoYDisgustado)
		assertSame(recetaConIngredienteAdecuadoYGustado, repositorioDeRecetas.sugerencia(user))
	}
	
	@Test
	@DisplayName("Una sugerencia individual solo sugiere una sola receta")
	def void recetaSugeridaEsSoloUna() {
		val recetasSugeridas = new HashSet<Receta>
		val sugerencia = user.copiarReceta(recetaConIngredienteAdecuadoYGustado)
		repositorioDeRecetas.create(recetaConIngredienteAdecuadoYGustado)
		repositorioDeRecetas.create(sugerencia)
		recetasSugeridas.addAll(repositorioDeRecetas.sugerencia(user))
		assertEquals(1, recetasSugeridas.size)
	}
	
	@Test
	@DisplayName("Una receta con ingredientes disgustados y condiciones adecuadas para el usuario no debe ser sugerida")
	def void recetaNoEsSugeridaPorTenerIngredienteDisgustado() {
		repositorioDeRecetas.create(recetaConIngredienteAdecuadoYDisgustado)
		assertNull(repositorioDeRecetas.sugerencia(user))
	}
	
	@Test
	@DisplayName("Una receta con ingredientes gustados y condiciones inadecuadas para el usuario no debe ser sugerida")
	def void recetaNoEsSugeridaPorTenerIngredienteInadecuado() {
		repositorioDeRecetas.create(recetaConIngredienteInadecuadoYGustado)
		assertNull(repositorioDeRecetas.sugerencia(user))
	}  
}
