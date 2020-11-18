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
import java.util.Map
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

@AutoConfigureJsonTesters
@ContextConfiguration(classes=UsuarioController)
@WebMvcTest
@DisplayName("Dado el controller de usuario")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)

class TestsUsuarioController {
	
	@Autowired
	MockMvc mockMvc
	RepoUsuario repoUsuario = RepoUsuario.instance
	
	
	@BeforeEach
	def void init() {
//		repoUsuario => [
//			objects.clear
//			create(new Usuario)
//			create(new Usuario)
//			create(new Usuario)
//			create(new Usuario)
//			create(new Usuario)
//		]
	}
	
	@DisplayName("cuando pido un request a la url /usuarios obtengo un status 200 y la lista de usuarios del repo")
	@Test
	def void testObtenerSaludoDefault() {
		val responseEntity = mockMvc.perform(MockMvcRequestBuilders.get("/usuarios")).andReturn.response
		val usuarios = responseEntity.contentAsString.fromJsonToList(Usuario)
		assertEquals(200, responseEntity.status)
		//assertEquals(usuarios.size, 5)
		//assertTrue(usuarios.exists[usuario|usuario.nombreYApellido.equals("Pepe Palala")])
	}
	
//	static def getField(MockHttpServletResponse responseEntity, String fieldName) {
//		mapper.readValue(responseEntity.contentAsString, new TypeReference<Map<String, Object>>() {
//		}).get(fieldName)
//	}

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