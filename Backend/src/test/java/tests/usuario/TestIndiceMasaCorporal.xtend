package tests.usuario

import dominio.Usuario
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertFalse
import static org.junit.jupiter.api.Assertions.assertTrue

class TestIndiceMasaCorporal {

	Usuario usuarioPocoPesoYAlto = new Usuario => [
		peso = 60.0
		estatura = 2.0
	]

	@Test
	@DisplayName("A un usuario que pesa poco y es alto le da bajo su indice de masa corporal")
	def void usuarioConBajoImc() {
		assertEquals(15.0, usuarioPocoPesoYAlto.indiceMasaCorporal)
	}

	@Test
	@DisplayName("Si un usuario tiene bajo imc, este no es saludable")
	def void usuarioConBajoImcNoEsSaludable() {
		assertFalse(usuarioPocoPesoYAlto.imcEsSaludable)
	}

	@Test
	@DisplayName("Si un usuario tiene alto imc, este es saludable")
	def void usuarioConAltoImcEsSaludable() {
		val usuarioImcSaludable = new Usuario => [
			peso = 70.0
			estatura = 1.70
		]
		assertTrue(usuarioImcSaludable.imcEsSaludable)
	}

}
