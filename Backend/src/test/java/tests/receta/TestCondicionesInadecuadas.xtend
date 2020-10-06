package tests.receta

import tp.food.overflow.Ingrediente	
import tp.food.overflow.Alimento
import tp.food.overflow.Receta
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import tp.food.overflow.Vegetariano
import tp.food.overflow.Hipertenso
import tp.food.overflow.RecetaCompuesta
import tp.food.overflow.Celiaco

@DisplayName("Testeamos el metodo condicionesInadecuadasReceta")
class TestCondicionesInadecuadas {

	Alimento alimentoInadecuadoParaVegetarianos
	Alimento alimentoInadecuadoParaHipertensos
	Alimento alimentoInadecuadoParaCeliacos
	Ingrediente ingredienteInadecuadoParaVegetarianos
	Ingrediente ingredienteInadecuadoParaHipertensos
	Ingrediente ingredienteInadecuadoParaCeliacos
	RecetaCompuesta recetaCompuesta
	RecetaCompuesta subrecetaCompuesta
	Receta subrecetaSimple
	Vegetariano vegetariano
	Hipertenso hipertenso
	Celiaco celiaco

	@BeforeEach
	def void init() {
		alimentoInadecuadoParaVegetarianos = new Alimento
		alimentoInadecuadoParaHipertensos = new Alimento
		alimentoInadecuadoParaCeliacos = new Alimento
		ingredienteInadecuadoParaVegetarianos = new Ingrediente() => [
			alimento = alimentoInadecuadoParaVegetarianos
		]
		ingredienteInadecuadoParaHipertensos = new Ingrediente() => [
			alimento = alimentoInadecuadoParaHipertensos
		]
		ingredienteInadecuadoParaCeliacos = new Ingrediente() => [
			alimento = alimentoInadecuadoParaCeliacos
		]
		recetaCompuesta = new RecetaCompuesta
		subrecetaCompuesta = new RecetaCompuesta
		subrecetaSimple = new Receta
		vegetariano = Vegetariano.getInstancia
		hipertenso = Hipertenso.getInstancia
		celiaco = Celiaco.getInstancia
	}

	@Test
	@DisplayName("Las condiciones inadecuadas de una receta simple deben coincidir con las condiciones inadecuadas de los alimentos que compone")
	def void recetaContieneCondicionesInadecuadasDeSusAlimentos() {
		alimentoInadecuadoParaHipertensos.agregarCondicionInadecuada(hipertenso)
		subrecetaSimple.agregarIngrediente(ingredienteInadecuadoParaHipertensos)
		assertTrue(subrecetaSimple.condicionesInadecuadasReceta.contains(hipertenso))
	}

	@Test
	@DisplayName("Las condiciones inadecuadas de una receta compuesta deben ser las suyas mas las de sus subrecetas")
	def void recetaCompuestaContieneCondicionesInadecuadasDeSusAlimentos() {
		alimentoInadecuadoParaVegetarianos.agregarCondicionInadecuada(vegetariano)
		alimentoInadecuadoParaHipertensos.agregarCondicionInadecuada(hipertenso)
		alimentoInadecuadoParaCeliacos.agregarCondicionInadecuada(celiaco)
		recetaCompuesta.agregarIngrediente(ingredienteInadecuadoParaVegetarianos)
		subrecetaCompuesta.agregarIngrediente(ingredienteInadecuadoParaCeliacos)
		subrecetaSimple.agregarIngrediente(ingredienteInadecuadoParaHipertensos)
		recetaCompuesta.agregarSubreceta(subrecetaCompuesta)
		subrecetaCompuesta.agregarSubreceta(subrecetaSimple)
		assertTrue(recetaCompuesta.condicionesInadecuadasReceta.contains(vegetariano))
		assertTrue(recetaCompuesta.condicionesInadecuadasReceta.contains(hipertenso))
		assertTrue(recetaCompuesta.condicionesInadecuadasReceta.contains(celiaco))
	//estamos testeando una jerarquizacion de tres niveles de anidamiento
	}
}
