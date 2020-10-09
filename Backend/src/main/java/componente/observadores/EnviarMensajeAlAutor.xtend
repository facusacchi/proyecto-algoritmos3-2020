package componente.observadores

import dominio.Receta
import dominio.Usuario
import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

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
	Usuario destinatario
	String cuerpo
	Usuario remitente
	LocalDateTime fechaYHoraDeEmision
	LocalDateTime fechaYHoraDeLectura
	boolean leido = false
}

@Accessors
class MensajeSender {
	def send(Usuario destinatario, Mensaje mensaje) {
		destinatario.recibirMensaje(mensaje)
	}
}