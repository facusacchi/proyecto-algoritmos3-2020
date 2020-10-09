package tests.repoAlimento

import dominio.Alimento
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.Repositorio

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo search")
class TestSearch {
	
	Alimento alimentoSeLlamaCarne
	Alimento alimentoConDescripcionCarne
	Alimento alimentoConDescripcionPollo
	Repositorio<Alimento> repositorioDeAlimentos
	
	@BeforeEach
	def void init() {
		alimentoSeLlamaCarne = new Alimento() => [
			nombre = "carne"
			descripcion = ""
		]
		
		alimentoConDescripcionCarne = new Alimento() => [
			nombre = ""
			descripcion = "carne"
		]
		
		alimentoConDescripcionPollo = new Alimento() => [
			nombre = ""
			descripcion = "pollo"
		]
		
		repositorioDeAlimentos = new Repositorio<Alimento>
	}
	
	@Test
	@DisplayName("Matcheo dos elementos que coinciden con el valor buscado, ya sea en su nombre o en su descripcion")
	def void buscamosElementosSegunValorEnNombreODescripcion() {
		repositorioDeAlimentos.create(alimentoSeLlamaCarne)
		repositorioDeAlimentos.create(alimentoConDescripcionCarne)
		repositorioDeAlimentos.create(alimentoConDescripcionPollo)
		assertEquals(2, repositorioDeAlimentos.search("carne").size)
	}
	
	@Test
	@DisplayName("Matcheo un elemento que coincide con el valor buscado en su descripcion")
	def void buscamosElementosSegunValorEnDescripcion() {
		repositorioDeAlimentos.create(alimentoSeLlamaCarne)
		repositorioDeAlimentos.create(alimentoConDescripcionCarne)
		repositorioDeAlimentos.create(alimentoConDescripcionPollo)
		assertEquals(1, repositorioDeAlimentos.search("pollo").size)
	}
	
	@Test
	@DisplayName("No matcheo ningun elemento que coinciden con el valor buscado en su nombre o descripcion")
	def void noEncontramosElementoSegunCriterio() {
		repositorioDeAlimentos.create(alimentoSeLlamaCarne)
		repositorioDeAlimentos.create(alimentoConDescripcionCarne)
		repositorioDeAlimentos.create(alimentoConDescripcionPollo)
		assertEquals(0, repositorioDeAlimentos.search("pizza").size)
	}	
}