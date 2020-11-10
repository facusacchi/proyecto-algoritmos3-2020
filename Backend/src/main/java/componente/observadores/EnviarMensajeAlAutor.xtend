package componente.observadores

import dominio.Receta
import dominio.Usuario
import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.format.DateTimeFormatter
import java.time.LocalDate

class EnviarMensajeAlAutor extends Observador {
	
	MensajeSender mensajeSender	= new MensajeSender
	
	new(Usuario sujeto) {
		this.sujeto = sujeto
		this.sujeto.agregarObservador(this)
	}
	
	override actualizar(Receta receta) {
		val mensaje = new Mensaje
		mensaje.destinatario = receta.autor
		mensaje.cuerpo = "Hice una copia de tu receta " + receta.nombreDelPlato
		mensaje.remitente = this.sujeto
		mensaje.fechaYHoraDeEmision = LocalDateTime.now
		mensajeSender.send(receta.autor, mensaje)
	}
}

@Accessors
class Mensaje {
	Integer id
	Usuario destinatario
	String cuerpo
	Usuario remitente
	LocalDateTime fechaYHoraDeEmision
	LocalDateTime fechaYHoraDeLectura
	boolean leido = false
	//static String DATE_PATTERN = "yyyy-MM-dd"
	static String DATE_PATTERN ='MM-dd-YY h:mm a'
	
	def formatter() {
		DateTimeFormatter.ofPattern(DATE_PATTERN)
	}
	
	@JsonProperty("destinatario")
	def getDestinatarioAsString() {
		destinatario.nombreYApellido
	}
	
	@JsonProperty("destinatario")
	def setDestinatarioAsDomainObject(String destinatario) {
		this.destinatario = new Usuario => [ nombreYApellido = destinatario ]
	}
	
	@JsonProperty("remitente")
	def getRemitenteAsString() {
		remitente.nombreYApellido
	}
	
	@JsonProperty("remitente")
	def setRemitenteAsDomainObject(String remitente) {
		this.remitente = new Usuario => [ nombreYApellido = remitente ]
	}
	
//	@JsonProperty("fechaYHoraDeEmision")
//	def getFechaDeEmisionAsString() {
//		formatter.format(this.fechaYHoraDeEmision)
//	}
	
//	@JsonProperty("fechaYHoraDeEmision")
//	def setFechaDeEmisionAsDomainObject(String fecha) {
//		fechaYHoraDeEmision = LocalDateTime.parse(fecha, formatter)
//	}
	
//	@JsonProperty("fechaYHoraDeLectura")
//	def getFechaDeLecturaAsString() {
//		formatter.format(this.fechaYHoraDeLectura)
//	}
	
//	@JsonProperty("fechaYHoraDeLectura")
//	def setFechaDeLecturaAsDomainObject(String fecha) {
//		fechaYHoraDeLectura = LocalDateTime.parse(fecha, formatter)
//	}
}

@Accessors
class MensajeSender {
	def send(Usuario destinatario, Mensaje mensaje) {
		destinatario.recibirMensaje(mensaje)
	}
}