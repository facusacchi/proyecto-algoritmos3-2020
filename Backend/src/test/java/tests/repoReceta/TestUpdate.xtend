package tests.repoReceta

import dominio.Receta
import dominio.RecetaCompuesta
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.RepoReceta

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo update")
class TestUpdate {
	
	Receta receta
	RepoReceta repositorioDeRecetas = RepoReceta.instance

	
	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		receta = new Receta
	}
	
	@Test
	@DisplayName("Cuando updateo un elemento del repo, este cambia sus caracteristicas: se ha modificado")
	def void actualizoObjetoDelRepositorio() {
		receta.nombreDelPlato = "Papaya" // modificacion del elemento
		receta.id = 1 //sera el mismo id que se le asigne al elemento que utiliza el metodo create
		repositorioDeRecetas.create(new Receta)
		repositorioDeRecetas.update(receta)
		assertEquals("Papaya", repositorioDeRecetas.objects.get(0).nombreDelPlato)
		assertEquals(receta, repositorioDeRecetas.objects.get(0))
	}
	
	@Test
	@DisplayName("Cuando se intenta actualizar una receta que no esta en el repositorio, es lanzada una excepcion")
	def void mensajeDeExcepcionCuandoNoSeEncuentraReceta() {
		repositorioDeRecetas.create(new Receta)
		repositorioDeRecetas.create(new RecetaCompuesta)
		assertThrows(Exception, [repositorioDeRecetas.update(receta)])
	}
}