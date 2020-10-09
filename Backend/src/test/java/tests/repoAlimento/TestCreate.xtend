package tests.repoAlimento

import dominio.Alimento
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.Repositorio

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo create")
class TestCreate {
	
	Alimento alimento
	Repositorio<Alimento> repositorioDeAlimentos
	
	@BeforeEach
	def void init() {
		alimento = new Alimento
		repositorioDeAlimentos = new Repositorio<Alimento>	
	}
	
	@Test
	@DisplayName("Cuando creo un objeto alimento en su respectivo repositorio, este mismo lo debe contener asignandole un numero de id")
	def void creoObjetoEnElRepositorio() {
		repositorioDeAlimentos.create(new Alimento)
		repositorioDeAlimentos.create(new Alimento)
		repositorioDeAlimentos.create(alimento)
		assertTrue(repositorioDeAlimentos.objects.contains(alimento))
		assertEquals(3, alimento.id)
	}
}