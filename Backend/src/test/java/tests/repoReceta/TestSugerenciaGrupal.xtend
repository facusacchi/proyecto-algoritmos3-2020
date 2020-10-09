package tests.repoReceta

import dominio.Alimento
import dominio.Hipertenso
import dominio.Ingrediente
import dominio.Receta
import dominio.Usuario
import java.util.HashSet
import java.util.Set
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.RepoReceta

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo de sugerencia (grupal)")
class TestSugerenciaGrupal {
	RepoReceta repositorioDeRecetas = RepoReceta.instance
	Receta recetaConIngredienteDisgustado
	Receta recetaConIngredienteAdecuadoYGustadoPorTodos
	Receta recetaConIngredienteInadecuado
	Ingrediente ingredienteAdecuadoYGustadoPorTodos
	Ingrediente ingredienteInadecuado
	Ingrediente ingredienteDisgustado
	Alimento alimentoAdecuadoYGustadoPorTodos
	Alimento alimentoInadecuado
	Alimento alimentoDisgustado
	Usuario userSinRestriccionesEnLosIngredientes
	Usuario userConIngredienteInadecuado
	Usuario userConIngredienteDisgustado
	Set<Usuario> grupo
	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		alimentoAdecuadoYGustadoPorTodos = new Alimento
		alimentoInadecuado = new Alimento
		alimentoDisgustado = new Alimento
		userSinRestriccionesEnLosIngredientes = new Usuario
		userConIngredienteInadecuado = new Usuario
		userConIngredienteDisgustado = new Usuario
		grupo = new HashSet<Usuario>
		ingredienteAdecuadoYGustadoPorTodos = new Ingrediente() => [
			alimento = alimentoAdecuadoYGustadoPorTodos
		]
		ingredienteInadecuado = new Ingrediente() => [
			alimento = alimentoInadecuado
		]
		ingredienteDisgustado = new Ingrediente() => [
			alimento = alimentoDisgustado
		]
		recetaConIngredienteDisgustado = new Receta
		recetaConIngredienteInadecuado = new Receta
		recetaConIngredienteAdecuadoYGustadoPorTodos = new Receta
		
		alimentoInadecuado.agregarCondicionInadecuada(Hipertenso.getInstancia)
		recetaConIngredienteDisgustado.agregarIngrediente(ingredienteDisgustado)
		recetaConIngredienteInadecuado.agregarIngrediente(ingredienteInadecuado)
		recetaConIngredienteAdecuadoYGustadoPorTodos.agregarIngrediente(ingredienteAdecuadoYGustadoPorTodos)
		userConIngredienteInadecuado.agregarCondicionAlimenticia(Hipertenso.getInstancia)
		userConIngredienteDisgustado.agregarAlimentoDisgustado(alimentoDisgustado)
		grupo.add(userConIngredienteInadecuado)
		grupo.add(userConIngredienteDisgustado)
		grupo.add(userSinRestriccionesEnLosIngredientes)
	}
	
	@Test
	@DisplayName("Dado una sola receta adecuada y gustada por todos, la sugerencia grupal me trae una sola receta que satisface a todos")
	def void recetaSatisfaceATodos() {
		repositorioDeRecetas.create(recetaConIngredienteDisgustado)
		repositorioDeRecetas.create(recetaConIngredienteInadecuado)
		repositorioDeRecetas.create(recetaConIngredienteAdecuadoYGustadoPorTodos)
		assertEquals(1, repositorioDeRecetas.sugerenciaGrupal(grupo).size)
	}
	
	@Test
	@DisplayName("Si no hay ninguna receta adecuada y gustada por todos, la sugerencia grupal me trae la cantidad necesaria de recetas")
	def void ningunaSatisfaceATodos() {
		repositorioDeRecetas.create(recetaConIngredienteDisgustado)
		repositorioDeRecetas.create(recetaConIngredienteInadecuado)
		assertEquals(3, repositorioDeRecetas.sugerenciaGrupal(grupo).size)
	}
}