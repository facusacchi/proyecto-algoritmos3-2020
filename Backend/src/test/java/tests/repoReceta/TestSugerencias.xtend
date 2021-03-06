package tests.repoReceta

import dominio.Alimento
import dominio.Diabetico
import dominio.Hipertenso
import dominio.Ingrediente
import dominio.Receta
import dominio.Usuario
import dominio.Vegetariano
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import repos.RepoReceta

import static org.junit.jupiter.api.Assertions.assertEquals

@DisplayName("Testeamos las sugerencias grupales e individuales")
class TestSugerencias {

	Usuario usuarioVegetariano
	Ingrediente unaQuinoa
	Ingrediente medioPepino
	Ingrediente unMango
	Ingrediente unaBolaDeLomo
	Ingrediente dosPapas
	Alimento quinoa
	Alimento pepino
	Alimento mango
	Alimento bolaDeLomo
	Alimento papa
	Receta ensaladaDeQuinoa
	Receta milanesasConPure
	RepoReceta repositorioDeRecetas = RepoReceta.instance 

	@BeforeEach
	def void init() {
		RepoReceta.restartInstance
		quinoa = new Alimento
		pepino = new Alimento
		mango = new Alimento => [
			condicionesInadecuadas.add(Diabetico.instancia)
		]
		bolaDeLomo = new Alimento => [
			condicionesInadecuadas.add(Hipertenso.instancia)
		]
		papa = new Alimento

		unaQuinoa = new Ingrediente => [
			alimento = quinoa
		]
		medioPepino = new Ingrediente => [
			alimento = pepino
		]
		unMango = new Ingrediente => [
			alimento = mango
		]

		unaBolaDeLomo = new Ingrediente => [
			alimento = bolaDeLomo
		]
		dosPapas = new Ingrediente => [
			alimento = papa
		]

		usuarioVegetariano = new Usuario => [
			agregarCondicionAlimenticia(Vegetariano.getInstancia)
			alimentosDisgustados.add(bolaDeLomo)
		]
		ensaladaDeQuinoa = new Receta => [
			ingredientes.addAll(unaQuinoa, medioPepino, unMango)
		]
		milanesasConPure = new Receta => [
			ingredientes.addAll(unaBolaDeLomo, dosPapas)
		]
		repositorioDeRecetas.create(milanesasConPure)
		repositorioDeRecetas.create(ensaladaDeQuinoa)
	}

	@Test
	@DisplayName("A un usuario se le sugiere una receta")
	def void aUsuarioSeLeSugiereReceta() {
		val sugerencia = repositorioDeRecetas.sugerencia(usuarioVegetariano)
		assertEquals(sugerencia, ensaladaDeQuinoa)
	}
}
