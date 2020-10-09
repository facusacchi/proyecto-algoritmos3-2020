package tests.repoUsuario

import dominio.Usuario
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.Repositorio

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo search")
class TestSearch {
	
	Usuario userConNombre
	Usuario userConUserName
	Repositorio<Usuario> repositorioDeUsuarios
	
	@BeforeEach
	def void init() {
		userConNombre = new Usuario() => [
			nombreYApellido = "Pepita Ave"
			username = ""
		]
		
		userConUserName = new Usuario() => [
			nombreYApellido = ""
			username = "Pepi"
		]
		
		repositorioDeUsuarios = new Repositorio<Usuario>
	}
	
	@Test
	@DisplayName("Una busqueda con el valor 'Pepi' trae dos elementos: userConNombre y userConUserName")
	def void buscamosMatchConDosElemenetos() {
		repositorioDeUsuarios.create(userConNombre)
		repositorioDeUsuarios.create(userConUserName)
		assertEquals(2, repositorioDeUsuarios.search("Pepi").size)
		assertTrue(repositorioDeUsuarios.search("Pepi").contains(userConNombre))
		assertTrue(repositorioDeUsuarios.search("Pepi").contains(userConUserName))
	}
	
	@Test
	@DisplayName("Una busqueda con el valor 'Pepita' trae un elemento: userConNombre")
	def void buscamosMatchConUnElemeneto() {
		repositorioDeUsuarios.create(userConNombre)
		repositorioDeUsuarios.create(userConUserName)
		assertEquals(1, repositorioDeUsuarios.search("Pepita").size)
	}
}