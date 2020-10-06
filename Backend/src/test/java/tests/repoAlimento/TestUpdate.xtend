package tests.repoAlimento

import org.junit.jupiter.api.DisplayName	
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Alimento
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import repos.Repositorio

@DisplayName("Testeamos el metodo update")
class TestUpdate {
	
	Alimento alimento
	Repositorio<Alimento> repositorioDeAlimentos
	
	@BeforeEach
	def void init() {
		alimento = new Alimento
		repositorioDeAlimentos = new Repositorio<Alimento>	
	}
	
	@Test
	@DisplayName("Cuando updateo un elemento del repo, este cambia sus caracteristicas: se ha modificado")
	def void actualizoObjetoDelRepositorio() {
		alimento.nombre = "Papaya" // modificacion del elemento
		alimento.id = 1 //sera el mismo id que se le asigne al elemento que utiliza el metodo create
		repositorioDeAlimentos.create(new Alimento)
		repositorioDeAlimentos.update(alimento)
		assertEquals("Papaya", repositorioDeAlimentos.objects.get(0).getNombre)
		assertEquals(alimento, repositorioDeAlimentos.objects.get(0))
	}
	
	@Test
	@DisplayName("Cuando se intenta actualizar un alimento que no esta en el repositorio, es lanzada una excepcion")
	def void mensajeDeExcepcionCuandoNoSeEncuentraReceta() {
		repositorioDeAlimentos.create(new Alimento)
		repositorioDeAlimentos.create(new Alimento)
		assertThrows(Exception, [repositorioDeAlimentos.update(alimento)])
		
	}
}