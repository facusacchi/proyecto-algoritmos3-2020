package tests.repoUsuario

import org.junit.jupiter.api.DisplayName	
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Usuario
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import repos.Repositorio

@DisplayName("Testeamos el metodo getById")
class TestGetById {
	
	Usuario user
	Repositorio<Usuario> repositorioDeUsuarios
	
	@BeforeEach
	def void init() {
		user = new Usuario
		repositorioDeUsuarios = new Repositorio<Usuario>
	}
	
	@Test
	@DisplayName("Cuando busco un alimento por su id, debo obtener el elemento que coincida con dicho id en el repositorio")
	def void buscoObjetoDelRepositorio() {
		repositorioDeUsuarios.create(user)
		repositorioDeUsuarios.create(new Usuario)
		repositorioDeUsuarios.create(new Usuario)
		assertEquals(user, repositorioDeUsuarios.getById("1"))
	}
}