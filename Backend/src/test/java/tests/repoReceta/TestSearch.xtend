package tests.repoReceta

import dominio.Alimento
import dominio.Ingrediente
import dominio.Receta
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.RepoReceta

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo search")
class TestSearch {
	
	Receta recetaConNombre
	Receta recetaConNombreEnSusIngredientes
	RepoReceta repositorioDeRecetas = RepoReceta.instance
	Ingrediente SalsaPomarola
	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		recetaConNombre = new Receta() => [
			nombreDelPlato = "Chorizo a la pomarola"
		]
		
		recetaConNombreEnSusIngredientes = new Receta() => [
			nombreDelPlato = ""
		]  
		
		SalsaPomarola = new Ingrediente() => [
			alimento = new Alimento() =>[
				nombre = "pomarola"
			]	
		]
	}
	
	@Test
	@DisplayName("Cuando busco pasando el argumento 'pom' me debe retornar dos objetos")
	def void buscoObjetosSegunValorPom() {
		recetaConNombreEnSusIngredientes.agregarIngrediente(SalsaPomarola)
		repositorioDeRecetas.create(recetaConNombre)
		repositorioDeRecetas.create(recetaConNombreEnSusIngredientes)
		assertEquals(2, repositorioDeRecetas.search("pom").size)
	}
	
	@Test
	@DisplayName("Cuando busco pasando el argumento 'rizo' me debe retornar un objeto")
	def void buscoObjetosSegunValorRizo() {
		recetaConNombreEnSusIngredientes.agregarIngrediente(SalsaPomarola)
		repositorioDeRecetas.create(recetaConNombre)
		repositorioDeRecetas.create(recetaConNombreEnSusIngredientes)
		assertEquals(1, repositorioDeRecetas.search("rizo").size)
	}
	
	@Test
	@DisplayName("Cuando busco pasando el argumento 'abcd' no debe retornar ningun objeto")
	def void buscoObjetosSegunValorAbcd() {
		recetaConNombreEnSusIngredientes.agregarIngrediente(SalsaPomarola)
		repositorioDeRecetas.create(recetaConNombre)
		repositorioDeRecetas.create(recetaConNombreEnSusIngredientes)
		assertEquals(0, repositorioDeRecetas.search("abcd").size)
	}
}