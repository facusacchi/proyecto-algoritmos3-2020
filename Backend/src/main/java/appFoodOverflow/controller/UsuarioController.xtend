package appFoodOverflow.controller

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import repos.RepoUsuario
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import dominio.Usuario
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.eclipse.xtend.lib.annotations.Accessors

@RestController
@CrossOrigin("http://localhost:4200")
class UsuarioController {

@PostMapping(value="/login")
	def buscarUsuario(@RequestBody String body) {
		val dataSession = mapper.readValue(body, DataSession)
		if(dataSession === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''Error al construir los datos de sesion''')
		}
		val usuario = RepoUsuario.instance.getByLogin(dataSession.userName, dataSession.password)
		if(usuario === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el usuario con ese username o contraseña''')
		}
		ResponseEntity.ok(mapper.writeValueAsString(usuario))
	}
	
//	@PutMapping(value="/perfilDeUsuario/{id}")
//	def actualizar(@RequestBody String body, @PathVariable Integer id) {
//		if (id === null || id === 0) {
//			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
//		}
//		val actualizado = mapper.readValue(body, Usuario)
//
//		if (id != actualizado.id) {
//			return ResponseEntity.badRequest.body("Id en URL distinto del id que viene en el body")
//		}
//		RepoUsuario.instance.update(actualizado)
//		ResponseEntity.ok(mapper.writeValueAsString(actualizado))
//	}
	
	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
	
}

@Accessors
class DataSession {
	String userName
	String password
}
	
