package tests.usuario

import componente.observadores.MailAColaboradores
import dominio.Receta
import dominio.Usuario
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.*

class TestEnviarMailColaboradoresObserver {
	
	Usuario userQueCopiaReceta
	MailAColaboradores mailAColaboradores
	Receta unaReceta
	
	@BeforeEach
	def void init() {
		userQueCopiaReceta = new Usuario
		mailAColaboradores = new MailAColaboradores(userQueCopiaReceta) 
		unaReceta = new Receta() => [
			nombreDelPlato = "Carne con papas"
		]
		
		unaReceta.agregarColaborador(new Usuario)
		unaReceta.agregarColaborador(new Usuario)
		unaReceta.agregarColaborador(new Usuario)
	}
	
	@Test
	@DisplayName("Cuando se copia una receta, todos los colaboradores de esta, reciben un mail")
	def void colaboradoresRecibenMailAlCopiarseUnaReceta() {
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertEquals(1, unaReceta.colaboradores.get(0).mails.size)
		assertEquals(1, unaReceta.colaboradores.get(1).mails.size)
		assertEquals(1, unaReceta.colaboradores.get(2).mails.size)
	}
	
	@Test
	@DisplayName("Cuando se copia una receta sin el observer, ningun colaborador recibe mail")
	def void colaboradoresNoRecibenMailAlCopiarseUnaReceta() {
		userQueCopiaReceta.quitarObservador(mailAColaboradores)
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertEquals(0, unaReceta.colaboradores.get(0).mails.size)
		assertEquals(0, unaReceta.colaboradores.get(1).mails.size)
		assertEquals(0, unaReceta.colaboradores.get(2).mails.size)
	}
	
	@Test
	@DisplayName("El nombre de la receta copiada es enviada en el cuerpo del mail")
	def void nombreDeRecetaCopiadaEsEnviadaEnCuerpoDelMail() {
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertTrue(unaReceta.colaboradores.get(0).mails.get(0).cuerpo.contains("Carne con papas"))
	}
	
	@Test
	@DisplayName("El remitente y el destinatario son enviados en el mail")
	def void remitenteYDestinatarioSonEnviadosEnElMail() {
		userQueCopiaReceta.copiarReceta(unaReceta)
		assertEquals(userQueCopiaReceta, unaReceta.colaboradores.get(0).mails.get(0).remitente)
		assertEquals(unaReceta.colaboradores.get(0), unaReceta.colaboradores.get(0).mails.get(0).destinatario)
	} 
}