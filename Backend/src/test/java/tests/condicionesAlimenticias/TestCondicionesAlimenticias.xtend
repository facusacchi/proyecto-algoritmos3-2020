package tests.condicionesAlimenticias

import dominio.Alimento
import dominio.Alimento.Grupo
import dominio.CondicionAlimenticia
import dominio.Diabetico
import dominio.Hipertenso
import dominio.Rutina
import dominio.Usuario
import dominio.Vegano
import dominio.Vegetariano
import java.time.LocalDate
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.assertFalse
import static org.junit.jupiter.api.Assertions.assertTrue

@DisplayName("Tests de las condiciones alimenticias")
class TestCondicionesAlimenticias {

	Alimento doritos = new Alimento => [
		grupo = Grupo.ACEITES_GRASAS_AZUCARES
	]
	Alimento banana = new Alimento => [
		grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
	]
	Alimento pomelo = new Alimento => [
		grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
	]

	CondicionAlimenticia vegetariano = Vegetariano.getInstancia
	CondicionAlimenticia vegano = Vegano.getInstancia
	CondicionAlimenticia hipertenso = Hipertenso.getInstancia
	CondicionAlimenticia diabetico = Diabetico.getInstancia

	@Test
	@DisplayName("Un usuario joven con grasas en sus alimentos preferidos subsana condicion vegetariana")
	def void usuarioJovenSubsanaVegetariano() {
		val usuarioJoven = new Usuario => [
			fechaDeNacimiento = LocalDate.of(2005, 4, 12)
			alimentosPreferidos.add(doritos)
		]
		assertTrue(vegetariano.subsanaCondicion(usuarioJoven))
	}
	
	@Test
	@DisplayName("Un usuario mayor con grasas en sus alimentos preferidos no subsana condicion vegetariana")
	def void usuarioMayorNoSubsanaVegetariano() {
		val usuarioMayor = new Usuario => [
			fechaDeNacimiento = LocalDate.of(1970, 3, 22)
			alimentosPreferidos.add(doritos)
		]
		assertFalse(vegetariano.subsanaCondicion(usuarioMayor))
	}
	
	@Test
	@DisplayName("Un usuario con varias frutas en sus alimentos preferidos subsana condicion vegana")
	def void usuarioQuePrefiereFrutasSubsanaVegano() {
		val usuarioFrutero = new Usuario => [
			alimentosPreferidos.add(banana)
			alimentosPreferidos.add(pomelo)
		]
		assertTrue(vegano.subsanaCondicion(usuarioFrutero))
	}
	
	@Test
	@DisplayName("Un usuario sin frutas en sus alimentos preferidos no subsana condicion vegana")
	def void usuarioQueNoPrefiereFrutasSubsanaVegano() {
		val usuarioSinPreferidosFrutas = new Usuario
		assertFalse(vegano.subsanaCondicion(usuarioSinPreferidosFrutas))
	}
	
	@Test
	@DisplayName("Un usuario con rutina intensiva subsana condicion hipertenso")
	def void usuarioQueTieneRutinaIntensivaSubsanaHipertenso() {
		val usuarioConRutinaIntensa = new Usuario => [
			rutina = Rutina.INTENSIVO
		]
		assertTrue(hipertenso.subsanaCondicion(usuarioConRutinaIntensa))
	}
	
	@Test
	@DisplayName("Un usuario sin rutina intensiva no subsana condicion hipertenso")
	def void usuarioQueNoTieneRutinaIntensivaNoSubsanaHipertenso() {
		val usuarioSinRutinaIntensa = new Usuario => [
			rutina = Rutina.LEVE
		]
		assertFalse(hipertenso.subsanaCondicion(usuarioSinRutinaIntensa))
	}
	
	@Test
	@DisplayName("Un usuario con rutina activa y con cierto peso subsana condicion diabetico")
	def void usuarioQueTieneRutinaActivaSubsanaDiabetico() {
		val usuarioConRutinaActiva = new Usuario => [
			rutina = Rutina.ACTIVA
			peso = 100.0
		]
		assertTrue(diabetico.subsanaCondicion(usuarioConRutinaActiva))
	}
	
	
	@Test
	@DisplayName("Un usuario sin rutina activa y con cierto peso no subsana condicion diabetico")
	def void usuarioQueNoTieneRutinaActivaYEsPesadoNoSubsanaDiabetico() {
		val usuarioSinRutinaActiva = new Usuario => [
			rutina = Rutina.MEDIANO
			peso = 100.0
		]
		assertFalse(diabetico.subsanaCondicion(usuarioSinRutinaActiva))
	}

}
