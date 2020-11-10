package appFoodOverflow.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.web.bind.annotation.RequestBody
import componente.observadores.Mensaje
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import repos.RepoUsuario
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable

@RestController
@CrossOrigin("http://localhost:3000")
class MensajeController {
	
//	@PutMapping(value="/enviarMensaje")
//	def actualizar(@RequestBody String body) {
//		val mensaje = mapper.readValue(body, Mensaje)
//		if(mensaje === null) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''Error al construir el mensaje''')
//		}
//		val destinatario = RepoUsuario.instance.getByUserName(mensaje.destinatario)
//		if(destinatario === null) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''Error, no se encontro destinatario''')
//		}
//		destinatario.recibirMensaje(mensaje)
//	}
	
	@GetMapping("/inbox/{id}")
	def mensajesPorId(@PathVariable Integer id) {
		if (id === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}
		val usuario = RepoUsuario.instance.getById(id.toString)
		if (usuario === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el usuario con id <«id»>''')
		}
		val mensajes = usuario.mensajesInternos
		if (mensajes === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontraron mensajes del usuario con id <«id»>''')
		} 
		ResponseEntity.ok(mensajes)
	}
	
	@GetMapping("/{id}/mensaje/{mensajeId}")
	def mensajePorId(@PathVariable Integer id, @PathVariable Integer mensajeId) {
		if (id === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}
		val usuario = RepoUsuario.instance.getById(id.toString)
		if (usuario === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el mensaje con id <«id»>''')
		}
		val mensaje = usuario.accederAUnMensaje(mensajeId)
		if (mensaje === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontraron mensajes con id <«mensajeId»> del usuario <«id»>''')
		} 
		ResponseEntity.ok(mensaje)
	}
	
	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
}