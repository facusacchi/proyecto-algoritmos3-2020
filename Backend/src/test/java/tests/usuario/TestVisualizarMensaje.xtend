package tests.usuario

import tp.food.overflow.Usuario	
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import static org.junit.jupiter.api.Assertions.*
import componente.observadores.Mensaje
import java.time.LocalDateTime

class TestVisualizarMensaje {
	
	Usuario userQueEnviaMensaje
	Usuario userQueRecibeMensaje
	Mensaje unMensaje
	
	@BeforeEach
	def void init() {
		userQueRecibeMensaje = new Usuario
		userQueEnviaMensaje = new Usuario
		unMensaje = new Mensaje() => [
			destinatario = userQueRecibeMensaje
			cuerpo = "Hola que tal"
			remitente =  userQueEnviaMensaje
			fechaYHoraDeEmision = LocalDateTime.now
		]
	}


	@Test
	@DisplayName("Cuando un mensaje es visualizado por un usuario, dicho mensaje es marcado como leido")
	def void mensajeVisualizadoEsMensajeMarcadoComoLeido() {
		userQueRecibeMensaje.recibirMensaje(unMensaje)
		userQueRecibeMensaje.visualizarMensaje(unMensaje)
		assertTrue(unMensaje.leido)
	}
}