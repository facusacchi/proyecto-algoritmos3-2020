package tests.repoReceta

import dominio.Receta
import dominio.RecetaCompuesta
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.RepoReceta

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo delete")
class TestDelete {
	
	Receta recetaSimple
	RepoReceta repositorioDeRecetas = RepoReceta.instance
	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		recetaSimple = new Receta
	}
	
	@Test
	@DisplayName("Cuando borro un objeto receta de su respectivo repositorio, este objeto ya no debe estar en el")
	def void borroObjetoDelRepositorio() {
		repositorioDeRecetas.create(new Receta)
		repositorioDeRecetas.create(recetaSimple)
		repositorioDeRecetas.create(new RecetaCompuesta)
		repositorioDeRecetas.delete(recetaSimple)
		assertFalse(repositorioDeRecetas.objects.contains(recetaSimple))
	}
}