package tests.usuario

import dominio.Celiaco
import dominio.Usuario
import dominio.Vegano
import java.util.HashSet
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.assertFalse
import static org.junit.jupiter.api.Assertions.assertTrue

@DisplayName("Test del método esSaludable")
class TestEsSaludable {

	@Test
	@DisplayName("Un usuario con imc saludable y sin condiciones alimenticias es saludable")
	def void usuarioConImcSaludableYSinCondicionesEsSaludable() {
		val usuarioSaludable = new Usuario => [
			peso = 70.0
			estatura = 1.70
		]
		assertTrue(usuarioSaludable.esSaludable)
	}

	@Test
	@DisplayName("Un usuario con imc no saludable y con condiciones alimenticias no subsanadas no es saludable")
	def void usuarioConImcNoSaludableYCondicionesNoSubsanadasNoEsSaludable() {
		val usuarioNoSaludable = new Usuario => [
			peso = 60.0
			estatura = 2.0
			condicionesAlimenticias = new HashSet => [
				add(Vegano.getInstancia)
			]
		]
		assertFalse(usuarioNoSaludable.esSaludable)
	}

	@Test
	@DisplayName("Un usuario con imc no saludable y con condiciones alimenticias subsanadas es saludable")
	def void usuarioConImcNoSaludableYConCondicionesSubsanadasEsSaludable() {
		val usuarioSaludable = new Usuario => [
			peso = 60.0
			estatura = 2.0
			condicionesAlimenticias = new HashSet => [
				add(Celiaco.getInstancia)
			]
		]
		assertTrue(usuarioSaludable.esSaludable)
	}

}
