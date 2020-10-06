package tests.acciones

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import tp.food.overflow.AgregarColaborador
import tp.food.overflow.EditarDificultad
import tp.food.overflow.EditarTitulo
import tp.food.overflow.EliminarPaso
import tp.food.overflow.Receta
import tp.food.overflow.Receta.Dificultad
import tp.food.overflow.Usuario

import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertFalse
import static org.junit.jupiter.api.Assertions.assertTrue

@DisplayName("Testeamos las Acciones")
class TestAccion {

	@Test
	@DisplayName("La accion editar titulo cambia el nombre del plato de una receta")
	def void editarTitulo() {
		val receta = new Receta => [
			nombreDelPlato = "Papas fritas"
		]
		val editarTitulo = new EditarTitulo => [nuevoTitulo = "Pringles"]
		editarTitulo.ejecutar(receta)
		assertEquals("Pringles", receta.nombreDelPlato)
	}

	@Test
	@DisplayName("La accion editar dificultad cambia la dificultad de una receta")
	def void editarDificultad() {
		val editarDificultad = new EditarDificultad => [nuevaDificultad = Dificultad.FACIL]
		val receta = new Receta => [
			dificultad = Dificultad.MEDIA
		]
		editarDificultad.ejecutar(receta)
		assertEquals(Dificultad.FACIL, receta.dificultad)
	}

	@Test
	@DisplayName("La accion agregar colaborador agrega un colaborador a una receta")
	def void agregarColaborador() {
		val colaborador = new Usuario
		val agregarColaborador = new AgregarColaborador => [nuevoColaborador = colaborador]
		val receta = new Receta
		agregarColaborador.ejecutar(receta)
		assertTrue(receta.colaboradores.contains(colaborador))
	}
	
	@Test
	@DisplayName("La accion eliminar paso elimina un proceso de preparacion de una receta")
	def void eliminarPaso() {
		val agregarSal = "Agregar sal"
		val eliminarPaso = new EliminarPaso => [procesoDePreparacion = agregarSal]
		val receta = new Receta => [
			procesoDePreparacion.addAll("Agregar 500g harina", "Agregar 3 cucharadas de azucar", "Agregar sal")
		]
		eliminarPaso.ejecutar(receta)
		assertFalse(receta.procesoDePreparacion.contains(agregarSal))
	}
	
	@Test
	@DisplayName("Revertir accion editar titulo vuelve el nombre del plato a su nombre anterior")
	def void revertirEditarTitulo() {
		val receta = new Receta => [
			nombreDelPlato = "Papas fritas"
		]
		val editarTitulo = new EditarTitulo => [nuevoTitulo = "Pringles"]
		editarTitulo.ejecutar(receta)
		assertEquals("Pringles", receta.nombreDelPlato)
		editarTitulo.revetirAccion()
		assertEquals("Papas fritas", receta.nombreDelPlato)
	}
	
	@Test
	@DisplayName("Revertir accion eliminar paso vuelve los procesos de preparacion como estaban antes de la accion")
	def void revertirEliminarPaso() {
		val receta = new Receta => [
			procesoDePreparacion.addAll("Agregar 500g harina", "Agregar 3 cucharadas de azucar", "Agregar sal")
		]
		val eliminarPaso = new EliminarPaso => [procesoDePreparacion = "Agregar 3 cucharadas de azucar"]
		eliminarPaso.ejecutar(receta)
		assertFalse(receta.procesoDePreparacion.contains("Agregar 3 cucharadas de azucar"))
		eliminarPaso.revetirAccion()
		assertTrue(receta.procesoDePreparacion.contains("Agregar 3 cucharadas de azucar"))
	}

}
