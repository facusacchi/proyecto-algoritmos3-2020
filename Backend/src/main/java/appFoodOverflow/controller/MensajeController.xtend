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
import excepciones.BusinessException
import org.springframework.web.bind.annotation.PostMapping

@RestController
@CrossOrigin("http://localhost:3000")
class MensajeController {
	
	@PostMapping(value="/enviarMensaje/new")
	def actualizar(@RequestBody String body, @PathVariable Integer id) {
		if (id === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}
		val destinatario = RepoUsuario.instance.getById(id.toString)
		if (destinatario === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el destinatario con id <«id»>''')
		}
		val mensaje = mapper.readValue(body, Mensaje)
		if(mensaje === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''Error al construir el mensaje''')
		}
		destinatario.recibirMensaje(mensaje)
	}

	@PutMapping(value="/{id}/actualizarMensaje/{mensajeId}")
	def actualizarMensaje(@RequestBody String body, @PathVariable Integer id, @PathVariable Integer mensajeId) {
		try {
			if (id === null || id === 0) {
				return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
			}
			val mensajeActualizado = mapper.readValue(body, Mensaje)
			if (mensajeId != mensajeActualizado.id) {
				return ResponseEntity.badRequest.body("Id en URL distinto del id que viene en el body")
			}
			val usuario = RepoUsuario.instance.getById(id.toString)
			if (usuario === null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el usuario con id <«id»>''')
			}
			usuario.actualizarMensaje(mensajeActualizado)
			ResponseEntity.ok(mensajeActualizado)
		} catch (BusinessException e) {
			ResponseEntity.badRequest.body(mapper.writeValueAsString(e.message))
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}

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
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
				body('''No se encontraron mensajes del usuario con id <«id»>''')
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
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el usuario con id <«id»>''')
		}
		val mensaje = usuario.accederAUnMensaje(mensajeId)
		if (mensaje === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
				body('''No se encontraron mensajes con id <«mensajeId»> del usuario <«id»>''')
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
