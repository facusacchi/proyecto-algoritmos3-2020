package tests.repoAlimento

import dominio.Alimento
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.Repositorio

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo delete")
class TestDelete {
	
	Alimento alimento
	Repositorio<Alimento> repositorioDeAlimentos
	
	@BeforeEach
	def void init() {
		alimento = new Alimento
		repositorioDeAlimentos = new Repositorio<Alimento>	
	}
	
	@Test
	@DisplayName("Cuando borro un objeto alimento de su respectivo repositorio, este objeto ya no debe estar en el")
	def void borroObjetoDelRepositorio() {
		repositorioDeAlimentos.create(new Alimento)
		repositorioDeAlimentos.create(alimento)
		repositorioDeAlimentos.create(new Alimento)
		repositorioDeAlimentos.delete(alimento)
		assertFalse(repositorioDeAlimentos.objects.contains(alimento))
	}
}