package tests.repoUsuario

import dominio.Usuario
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.Repositorio

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Testeamos el metodo create")
class TestCreate {
	
	Usuario user
	Repositorio<Usuario> repositorioDeUsuarios
	
	@BeforeEach
	def void init() {
		user = new Usuario
		repositorioDeUsuarios = new Repositorio<Usuario>	
	}
	
	@Test
	@DisplayName("Cuando creo un objeto usuario en su respectivo repositorio, este mismo lo debe contener asignandole un numero de id")
	def void creoObjetoEnElRepositorio() {
		repositorioDeUsuarios.create(new Usuario)
		repositorioDeUsuarios.create(new Usuario)
		repositorioDeUsuarios.create(user)
		assertTrue(repositorioDeUsuarios.objects.contains(user))
		assertEquals(3, user.id)
	}
}