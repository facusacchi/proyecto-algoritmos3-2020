package tests.repoUsuario

import org.junit.jupiter.api.DisplayName			
import org.junit.jupiter.api.BeforeEach
import tp.food.overflow.Usuario
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import repos.Repositorio

@DisplayName("Testeamos el metodo update")
class TestUpdate {
	
	Usuario user
	Repositorio<Usuario> repositorioDeUsuarios
	
	@BeforeEach
	def void init() {
		user = new Usuario
		repositorioDeUsuarios = new Repositorio<Usuario>
	}
	
	@Test
	@DisplayName("Cuando updateo un elemento del repo, este cambia sus caracteristicas: se ha modificado")
	def void actualizoObjetoDelRepositorio() {
		user.nombreYApellido = "Pepe" // modificacion del elemento
		user.id = 1 //sera el mismo id que se le asigne al elemento que utiliza el metodo create
		repositorioDeUsuarios.create(new Usuario)
		repositorioDeUsuarios.update(user)
		assertEquals("Pepe", repositorioDeUsuarios.objects.get(0).nombreYApellido)
		assertEquals(user, repositorioDeUsuarios.objects.get(0))
	}
	
	@Test
	@DisplayName("Cuando se intenta actualizar un usuario que no esta en el repositorio, es lanzada una excepcion")
	def void excepcionCuandoNoSeEncuentraUsuario() {
		repositorioDeUsuarios.create(new Usuario)
		repositorioDeUsuarios.create(new Usuario)
		assertThrows(Exception, [repositorioDeUsuarios.update(user)])
	}
}