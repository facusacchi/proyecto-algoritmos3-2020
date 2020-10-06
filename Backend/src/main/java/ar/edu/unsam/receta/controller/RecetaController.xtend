package ar.edu.unsam.receta.controller

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

@RestController
class RecetaController {
		
	@GetMapping(value="/login/{idUsuario}")
	def buscarUsuario(@PathVariable Integer idUsuario) {
		try {
			validarId(idUsuario)
			val usuario = RepoUsuario.instance.getById(idUsuario.toString)
			if (usuario === null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el usuario''')
			}
			ResponseEntity.ok(usuario)
		}catch (RuntimeException e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}
	
	@PutMapping(value="/perfilDeUsuario/{idUsuario}")
	def actualizarUsuario(@RequestBody String body, @PathVariable Integer idUsuario) {
		try {
			validarId(idUsuario)
			val actualizado = mapper.readValue(body, Usuario)
		if (idUsuario != actualizado.id) {
				return ResponseEntity.badRequest.body("Id en URL distinto del id que viene en el body")
			}
			RepoUsuario.instance.update(actualizado)
			ResponseEntity.ok(actualizado)
		} catch (BusinessException e) {
			ResponseEntity.badRequest.body(e.message)
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
		]
	}

	def validarId(Integer idUsuario) {
		if (idUsuario === null || idUsuario === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}				
	}
}
	
