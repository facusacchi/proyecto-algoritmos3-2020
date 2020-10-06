package tests.repoAlimento

import org.junit.jupiter.api.DisplayName		
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Alimento
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import repos.Repositorio

@DisplayName("Testeamos el metodo getById")
class TestGetById {
	
	Alimento alimento
	Repositorio<Alimento> repositorioDeAlimentos
	
	@BeforeEach
	def void init() {
		alimento = new Alimento
		repositorioDeAlimentos = new Repositorio<Alimento>	
	}
	
	@Test
	@DisplayName("Cuando busco un alimento por su id, debo obtener el elemento que coincida con dicho id en el repositorio")
	def void buscoObjetoDelRepositorio() {
		repositorioDeAlimentos.create(alimento)
		repositorioDeAlimentos.create(new Alimento)
		repositorioDeAlimentos.create(new Alimento)
		assertEquals(alimento, repositorioDeAlimentos.getById("1"))
	}
}