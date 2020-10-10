package appFoodOverflow.controller

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import repos.RepoUsuario
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import dominio.Usuario
import org.springframework.web.bind.annotation.CrossOrigin

@RestController
@CrossOrigin("http://localhost:4200")
class UsuarioController {
		
	@GetMapping(value="/login/{idUsuario}")
	def buscarUsuario(@PathVariable Integer idUsuario) {
		if (idUsuario === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}
		val usuario = RepoUsuario.instance.getById(idUsuario.toString)
		if(usuario === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el usuario con ese id''')
		}
		ResponseEntity.ok(mapper.writeValueAsString(usuario))
	}
	
	@PutMapping(value="/perfilDeUsuario/{id}")
	def actualizar(@RequestBody String body, @PathVariable Integer id) {
		if (id === null || id === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}
		val actualizado = mapper.readValue(body, Usuario)

		if (id != actualizado.id) {
			return ResponseEntity.badRequest.body("Id en URL distinto del id que viene en el body")
		}
		RepoUsuario.instance.update(actualizado)
		ResponseEntity.ok(mapper.writeValueAsString(actualizado))
	}
	
	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
	
}
	
