package componente.observadores

import tp.food.overflow.Receta
import tp.food.overflow.Usuario
import org.eclipse.xtend.lib.annotations.Accessors

class MailAColaboradores extends Observador{
	
	MailSender mailSender = new MailSender
	
	new(Usuario sujeto) {
		this.sujeto = sujeto
		this.sujeto.agregarObservador(this)
	}
	
	override actualizar(Receta receta) {
		receta.colaboradores.forEach[colaborador | mailSender.send(sujeto, colaborador, receta)]
	}
}

@Accessors
class Mail {
	new() {}
	
	new(Mail mail) {
		this.cuerpo = mail.cuerpo
		this.remitente = mail.remitente
	}
	
	Usuario destinatario
	String cuerpo
	Usuario remitente
}

class MailSender {
	
	def send(Usuario remitente, Usuario destinatario, Receta receta) {
		destinatario.recibirMail(construirMail(remitente, destinatario, receta))
	}
	
	def construirMail(Usuario remitente, Usuario destinatario, Receta receta) {
		val mail = new Mail
		mail.remitente = remitente
		mail.cuerpo = "Se copio " + receta.nombreDelPlato
		mail.destinatario = destinatario
		mail
	}
}