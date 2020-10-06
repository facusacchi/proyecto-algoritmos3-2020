package tests.usuario

import tp.food.overflow.Usuario				
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName
import static org.junit.jupiter.api.Assertions.*
import componente.observadores.Mensaje
import componente.observadores.EnviarMensajeAlAutor
import tp.food.overflow.Receta

class TestEnviarMensajeObserver {
	
	Usuario userQueCopiaReceta
	Usuario userQueRecibeMensaje
	Mensaje unMensaje
	EnviarMensajeAlAutor mensajeAlAutor
	Receta unaReceta
	
	@BeforeEach
	def void init() {
		userQueCopiaReceta = new Usuario
		userQueRecibeMensaje = new Usuario
		unMensaje = new Mensaje
		mensajeAlAutor = new EnviarMensajeAlAutor(userQueCopiaReceta) 
		unaReceta = new Receta() => [
			nombreDelPlato = "Carne con papas"
			autor = userQueRecibeMensaje 
		]
	}
	
	@Test
	@DisplayName("Cuando un usuario copia una receta, el autor de la misma recibe un mensaje")
	def void autorRecibeMensaje() {
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertEquals(1, userQueRecibeMensaje.mensajesInternos.size)
		assertEquals(1, userQueCopiaReceta.observadores.size)
	}
	
	@Test
	@DisplayName("Cuando un usuario sin observer copia una receta, el autor de la misma no recibe mensaje")
	def void autorNoRecibeMensaje() {
		userQueCopiaReceta.quitarObservador(mensajeAlAutor)
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertEquals(0, unaReceta.autor.mensajesInternos.size)
		assertEquals(0, userQueCopiaReceta.observadores.size)
	}
	
	@Test
	@DisplayName("Cuando un usuario copia una receta, se envia un mensaje al autor de la misma, el cuerpo del mensaje debe concidir con el cuerpo del mensaje recibido")
	def void cuerpoCoincideConMensaje() {
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertEquals("Hice una copia de tu receta " + unaReceta.nombreDelPlato, userQueRecibeMensaje.mensajesInternos.get(0).cuerpo)
	}
	
	@Test
	@DisplayName("El remitente y destinatario de un mensaje deben coincidir con quien envia y recibe el mensaje respectivamente")
	def void remitenteYDestinatarioCoincidenRespectivamente() {
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertEquals(userQueCopiaReceta, userQueRecibeMensaje.mensajesInternos.get(0).remitente)
		assertEquals(userQueRecibeMensaje, userQueRecibeMensaje.mensajesInternos.get(0).destinatario)
	}
}