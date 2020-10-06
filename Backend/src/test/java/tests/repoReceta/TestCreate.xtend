package tests.repoReceta

import org.junit.jupiter.api.DisplayName		
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Receta
import org.junit.jupiter.api.Test
import repos.RepoReceta
import static org.junit.jupiter.api.Assertions.*
import tp.food.overflow.RecetaCompuesta

@DisplayName("Testeamos el metodo create")
class TestCreate {
	
	Receta recetaSimple
	RecetaCompuesta recetaCompuesta
	RepoReceta repositorioDeRecetas = RepoReceta.instance
	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		recetaSimple = new Receta
		recetaCompuesta = new RecetaCompuesta
	}
	
	@Test
	@DisplayName("Cuando creo una receta simple en el repositorio de recetas, este mismo lo debe contener asignandole un numero de id")
	def void creoRecetaSimpleEnElRepositorio() {
		repositorioDeRecetas.create(new Receta)
		repositorioDeRecetas.create(new Receta)
		repositorioDeRecetas.create(recetaSimple)
		assertTrue(repositorioDeRecetas.objects.contains(recetaSimple))
		assertEquals(3, recetaSimple.id)
	}
	
	@Test
	@DisplayName("Cuando creo una receta compuesta en el repositorio de recetas, este mismo lo debe contener asignandole un numero de id")
	def void creoRecetaCompuestaEnElRepositorio() {
		repositorioDeRecetas.create(new RecetaCompuesta)
		repositorioDeRecetas.create(new RecetaCompuesta)
		repositorioDeRecetas.create(recetaCompuesta)
		assertTrue(repositorioDeRecetas.objects.contains(recetaCompuesta))
		assertEquals(3, recetaCompuesta.id)
	}
	
}
