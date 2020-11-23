package tests.controllers

import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters
import org.springframework.test.context.ContextConfiguration
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.junit.jupiter.api.DisplayName
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.annotation.DirtiesContext.ClassMode
import appFoodOverflow.controller.UsuarioController
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.mock.web.MockHttpServletResponse
import com.fasterxml.jackson.core.type.TypeReference
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertTrue
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import java.util.List
import dominio.Usuario
import org.junit.jupiter.api.BeforeEach
import repos.RepoUsuario
import java.time.LocalDate
import dominio.Rutina
import dominio.Celiaco
import dominio.Vegetariano
import dominio.Vegano

@AutoConfigureJsonTesters
@ContextConfiguration(classes=UsuarioController)
@WebMvcTest
//@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
@DisplayName("Dado el controller de usuario")
class TestsUsuarioController {
	
	@Autowired
	MockMvc mockMvc
	
	@BeforeEach
	def void init() {
		RepoUsuario.restartInstance
		RepoUsuario.instance => [
			create(new Usuario => [
			nombreYApellido = "Pepe Palala"
			userName = "pepito"
			password = "123"
			peso = 75.0
			estatura = 1.75
			fechaDeNacimiento = LocalDate.of(1990,7,28)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			rutina = Rutina.ACTIVO
		])	
			create(new Usuario => [
			nombreYApellido = "Manolo Palala"
			userName = "manolito"
			password = "456"
			peso = 120.0
			estatura = 1.87
			fechaDeNacimiento = LocalDate.of(1995,10,4)
			agregarCondicionAlimenticia(Vegetariano.getInstancia)
			rutina = Rutina.LEVE
		])
			create(new Usuario => [
			nombreYApellido = "Nancy Vargas"
			userName = "nan"
			password = "123"
			peso = 120.0
			estatura = 1.90
			fechaDeNacimiento = LocalDate.of(1985,5,7)
			agregarCondicionAlimenticia(Vegano.getInstancia)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			rutina = Rutina.MEDIANO
		])
		]
	}
	
	@DisplayName("cuando pido un get request a la url /usuarios obtengo un status 200 y la lista de usuarios del repo")
	@Test
	def void obtenerUsuarios() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/usuarios")).andReturn.response
		val usuarios = responseEntity.contentAsString.fromJsonToList(Usuario)
		assertEquals(200, responseEntity.status)
		assertEquals(3, usuarios.size)
		assertTrue(usuarios.exists[usuario|usuario.nombreYApellido.equals("Pepe Palala")])
		assertTrue(usuarios.exists[usuario|usuario.nombreYApellido.equals("Manolo Palala")])
		assertTrue(usuarios.exists[usuario|usuario.nombreYApellido.equals("Nancy Vargas")])
	}
	
	@DisplayName("cuando pido un get request a la url /perfilDeUsuario/{id} me trae al user del repo que corresponde a ese id")
	@Test
	def void obtenerUsuarioPorId() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/perfilDeUsuario/1")).andReturn.response
		val usuario = responseEntity.contentAsString.fromJson(Usuario)
		assertEquals(200, responseEntity.status)
		assertEquals("Pepe Palala", usuario.nombreYApellido)
	}
	
	@DisplayName("cuando pido un get request a la url /usuarios/{valorBusqueda} me trae al user del repo que coincide con dicho valor de busqueda")
	@Test
	def void obtenerUsuarioPorValor() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/usuarios/pep")).andReturn.response
		val usuarios = responseEntity.contentAsString.fromJsonToList(Usuario)
		assertEquals(200, responseEntity.status)
		assertEquals(1, usuarios.size)
	}
	
	@DisplayName("cuando pido un put request a la url /perfilDeUsuario/1 los datos del body actualizan al user con el que coincide el id")
	@Test
	def void actualizarUsuario() {
		val usuarioBody = new Usuario => [
			id = 1
			nombreYApellido = "Pepe De Las Nieves Palala"
			userName = "pepito"
			password = "123"
			peso = 75.0
			estatura = 1.75
			fechaDeNacimiento = LocalDate.of(1990,7,28)
			rutina = Rutina.ACTIVO
		]
		val responseEntityPut = mockMvc.perform(MockMvcRequestBuilders
			.put("/perfilDeUsuario/1")
				.content(mapper.writeValueAsString(usuarioBody)))
					.andReturn.response
		assertEquals(200, responseEntityPut.status)
		val responseEntityGet = mockMvc.perform(MockMvcRequestBuilders.get("/perfilDeUsuario/1")).andReturn.response
		val usuarioActualizado = responseEntityGet.contentAsString.fromJson(Usuario)
		assertEquals(200, responseEntityGet.status)
		assertEquals("Pepe De Las Nieves Palala", usuarioActualizado.nombreYApellido)
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
	
	static def <T extends Object> fromJson(String json, Class<T> expectedType) {
		mapper.readValue(json, expectedType)
	}
}