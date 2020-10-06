package tests.repoReceta

import org.junit.jupiter.api.DisplayName		
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Receta
import org.junit.jupiter.api.Test
import repos.RepoReceta
import static org.junit.jupiter.api.Assertions.*
import tp.food.overflow.RecetaCompuesta

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