package tests.repoUsuario

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Usuario
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import repos.Repositorio

@DisplayName("Testeamos el metodo delete")
class TestDelete {

	Usuario user
	Repositorio<Usuario> repositorioDeUsuarios

	@BeforeEach
	def void init() {
		user = new Usuario
		repositorioDeUsuarios = new Repositorio<Usuario>
	}

	@Test
	@DisplayName("Cuando borro un objeto alimento de su respectivo repositorio, este objeto ya no debe estar en el")
	def void borroObjetoDelRepositorio() {
		repositorioDeUsuarios.create(new Usuario)
		repositorioDeUsuarios.create(user)
		repositorioDeUsuarios.create(new Usuario)
		repositorioDeUsuarios.delete(user)
		assertFalse(repositorioDeUsuarios.objects.contains(user))
	}
}
