package tests.controllers

import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters
import org.springframework.test.context.ContextConfiguration
import appFoodOverflow.controller.MensajeController
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.junit.jupiter.api.DisplayName
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.junit.jupiter.api.BeforeEach
import repos.RepoUsuario
import dominio.Usuario
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import componente.observadores.Mensaje
import java.time.LocalDateTime
import java.util.List
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.SerializationFeature

import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertTrue

@AutoConfigureJsonTesters
@ContextConfiguration(classes=MensajeController)
@WebMvcTest
@DisplayName("Dado el controller de mensaje")
class TestsMensajeController {

	@Autowired
	MockMvc mockMvc
	RepoUsuario repoUsuario
	Usuario nancy
	Usuario pepe
	Usuario manolo
	Mensaje mensajeParaNancy1
	Mensaje mensajeParaNancy2
	Mensaje mensajeParaNancy3

	@BeforeEach
	def void init() {
		RepoUsuario.restartInstance
		repoUsuario = RepoUsuario.instance
		nancy = new Usuario => [nombreYApellido = "Nancy Vargas"]
		pepe = new Usuario => [nombreYApellido = "Pepe Palala"]
		manolo = new Usuario => [nombreYApellido = "Manolo Palala"]
		repoUsuario.create(nancy)
		repoUsuario.create(pepe)
		repoUsuario.create(manolo)
		mensajeParaNancy1 = new Mensaje => [
			destinatario = nancy
			cuerpo = "Hola Nancy, soy Pepe, como estas Nancy?"
			remitente = pepe
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(38)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(2)
			leido = false
		]
		mensajeParaNancy2 = new Mensaje => [
			destinatario = nancy
			cuerpo = "Hola Nancy, soy Pepe de nuevo, recibiste mi ultimo mensaje?"
			remitente = pepe
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(30)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(2)
			leido = false
		]
		mensajeParaNancy3 = new Mensaje => [
			destinatario = nancy
			cuerpo = "Hola Nancy, soy Manolo, todo bien?"
			remitente = manolo
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(30)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(2)
			leido = false
		]
		nancy.recibirMensaje(mensajeParaNancy1)
		nancy.recibirMensaje(mensajeParaNancy2)
		nancy.recibirMensaje(mensajeParaNancy3)
	}

	@DisplayName("se pueden obtener todos los mensajes recibidos por un usuario")
	@Test
	def void testGetTodosLosMensajesDeUnUsuario() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/usuario/" + nancy.id + "/buscarMensajes")).
			andReturn.response
		val mensajes = responseEntity.contentAsString.fromJsonToList(Mensaje)
		assertEquals(200, responseEntity.status)
		assertEquals(mensajes.size, 3)
	}

	@DisplayName("se pueden buscar mensajes de cierto remitente entre los mensajes de un usuario")
	@Test
	def void testBuscarMensajesPorRemitente() {
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/usuario/" + nancy.id + "/buscarMensajes/pepe")).andReturn.response
		val mensajes = responseEntity.contentAsString.fromJsonToList(Mensaje)
		assertEquals(200, responseEntity.status)
		assertTrue(mensajes.forall[mensaje|mensaje.remitente.nombreYApellido.toLowerCase.contains("pepe")])
	}

	@DisplayName("se pueden buscar mensajes de cierto remitente entre los mensajes de un usuario, y que no se encuentre ninguno")
	@Test
	def void testBuscarMensajesPorRemitenteNoMatch() {
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/usuario/" + nancy.id + "/buscarMensajes/maria")).andReturn.response
		val mensajes = responseEntity.contentAsString.fromJsonToList(Mensaje)
		assertEquals(200, responseEntity.status)
		assertTrue(mensajes.empty)
	}

	@DisplayName("se puede obtener un mensaje por su id, entre los mensajes de cierto usuario")
	@Test
	def void testBuscarMensajePorIdOk() {
		val responseEntity = mockMvc.perform(
			MockMvcRequestBuilders.get("/" + nancy.id + "/mensaje/" + mensajeParaNancy3.id)).andReturn.response
		val mensaje = responseEntity.contentAsString.fromJson(Mensaje)
		assertEquals(200, responseEntity.status)
		assertEquals(mensaje.cuerpo, "Hola Nancy, soy Manolo, todo bien?")
	}

	@DisplayName("si se pide un mensaje con un id inválido se devuelve bad request")
	@Test
	def void testBuscarMensajePorIdInvalido() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/" + nancy.id + "/mensaje/0")).andReturn.
			response
		assertEquals(400, responseEntity.status)
		assertEquals("Debe ingresar el parámetro id", responseEntity.contentAsString)
	}

	@DisplayName("si se pide un mensaje con un id que no existe se produce un error")
	@Test
	def void testBuscarMensajePorIdInexistente() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/" + nancy.id + "/mensaje/200")).andReturn.
			response
		assertEquals(404, responseEntity.status)
		assertEquals("No se encontró el mensaje con id <200> del usuario <" + nancy.id + ">",
			responseEntity.contentAsString)
	}

	@DisplayName("actualizar un mensaje a leído, lo actualiza correctamente")
	@Test
	def void testActualizarUnMensajeOk() {
		val mensajeBody = new Mensaje => [
			id = mensajeParaNancy2.id
			destinatario = nancy
			remitente = pepe
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(30)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(2)
			leido = true
		]
		val responseEntityPut = mockMvc.perform(
			MockMvcRequestBuilders.put("/" + nancy.id + "/actualizarMensaje/" + mensajeParaNancy2.id).content(
				mapper.writeValueAsString(mensajeBody))).andReturn.response
		assertEquals(200, responseEntityPut.status)
		val responseEntityGet = mockMvc.perform(
			MockMvcRequestBuilders.get("/" + nancy.id + "/mensaje/" + mensajeParaNancy2.id)).andReturn.response
		val mensajeActualizado = responseEntityGet.contentAsString.fromJson(Mensaje)
		assertEquals(200, responseEntityGet.status)
		assertEquals(mensajeActualizado.leido, mensajeBody.leido)
	}

	@DisplayName("si se intenta actualizar un mensaje y no coinciden los ids de la url y el body se produce bad request")
	@Test
	def void testActualizarUnMensajeDistintosIdsException() {
		val mensajeBody = new Mensaje => [
			id = mensajeParaNancy2.id
			destinatario = nancy
			remitente = pepe
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(30)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(2)
			leido = true
		]
		val responseEntityPut = mockMvc.perform(
			MockMvcRequestBuilders.put("/" + nancy.id + "/actualizarMensaje/" + (mensajeParaNancy2.id + 1)).content(
				mapper.writeValueAsString(mensajeBody))).andReturn.response
		assertEquals(400, responseEntityPut.status)
		assertEquals("Id en URL distinto del id que viene en el body", responseEntityPut.contentAsString)
	}

	@DisplayName("se puede eliminar un mensaje por su id, entre los mensajes de cierto usuario")
	@Test
	def void testEliminarMensajePorIdOk() {
		val responseEntityDelete = mockMvc.perform(
			MockMvcRequestBuilders.delete("/" + nancy.id + "/eliminarMensaje/" + mensajeParaNancy3.id)).andReturn.
			response
		assertEquals(200, responseEntityDelete.status)
		assertEquals("\"El mensaje con id <" + mensajeParaNancy3.id + "> fue eliminado\"",
			responseEntityDelete.contentAsString)
		val responseEntityGet = mockMvc.perform(
			MockMvcRequestBuilders.get("/" + nancy.id + "/mensaje/" + mensajeParaNancy3.id)).andReturn.response
		assertEquals(404, responseEntityGet.status)
		assertEquals("No se encontró el mensaje con id <" + mensajeParaNancy3.id + "> del usuario <" + nancy.id + ">",
			responseEntityGet.contentAsString)
	}

	@DisplayName("enviar un mensaje y chequear que se agregó a los mensajes del usuario destinatario")
	@Test
	def void testEnviarUnMensajeOk() {
		val mensajeBody = new Mensaje => [
			destinatario = nancy
			cuerpo = "Hola Nancy, soy Manolo de nuevo, recibiste mi ultimo mensaje?"
			remitente = manolo
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(30)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(2)
		]
		val responseEntityPost = mockMvc.perform(
			MockMvcRequestBuilders.post("/" + nancy.id + "/enviarMensaje").content(
				mapper.writeValueAsString(mensajeBody))).andReturn.response
		assertEquals(200, responseEntityPost.status)
		assertEquals("\"Mensaje enviado\"", responseEntityPost.contentAsString)
		val responseEntityGet = mockMvc.perform(
			MockMvcRequestBuilders.get("/" + nancy.id + "/mensaje/" + (mensajeParaNancy3.id + 1))).andReturn.response
		val mensajeRecibido = responseEntityGet.contentAsString.fromJson(Mensaje)
		assertEquals(200, responseEntityGet.status)
		assertEquals(mensajeRecibido.cuerpo, "Hola Nancy, soy Manolo de nuevo, recibiste mi ultimo mensaje?")
	}

	static def <T extends Object> fromJson(String json, Class<T> expectedType) {
		mapper.readValue(json, expectedType)
	}

	static def <T extends Object> List<T> fromJsonToList(String json, Class<T> expectedType) {
		val type = mapper.getTypeFactory().constructCollectionType(List, expectedType)
		mapper.readValue(json, type)
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}

}
