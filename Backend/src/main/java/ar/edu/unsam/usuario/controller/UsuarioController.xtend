package ar.edu.unsam.usuario.controller

import org.springframework.web.bind.annotation.RestController			
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import tp.food.overflow.Usuario
import repos.RepoUsuario
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import ar.edu.unsam.exceptions.BusinessException
import com.fasterxml.jackson.databind.SerializationFeature

@RestController
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
	
	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
	
}
	
