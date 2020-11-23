package tests.controllers

import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters
import org.springframework.test.context.ContextConfiguration
import appFoodOverflow.controller.MensajeController
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.junit.jupiter.api.DisplayName
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.junit.jupiter.api.BeforeEach

@AutoConfigureJsonTesters
@ContextConfiguration(classes=MensajeController)
@WebMvcTest
@DisplayName("Dado el controller de mensaje")
class TestsMensajeController {

	@Autowired
	MockMvc mockMvc
	
	@BeforeEach
	def void init() {
		
	}
		
}