package tests.repoReceta

import dominio.Receta
import dominio.RecetaCompuesta
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.RepoReceta

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo getById")
class TestGetById {
	
	RecetaCompuesta recetaCompuesta
	RepoReceta repositorioDeRecetas = RepoReceta.instance
	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		recetaCompuesta = new RecetaCompuesta
	}
	
	@Test
	@DisplayName("Cuando busco una receta por su id, debo obtener el elemento que coincida con dicho id en el repositorio")
	def void buscoObjetoDelRepositorio() {
		repositorioDeRecetas.create(recetaCompuesta)
		repositorioDeRecetas.create(new Receta)
		repositorioDeRecetas.create(new Receta)
		assertEquals(recetaCompuesta, repositorioDeRecetas.getById("1"))
	}
}