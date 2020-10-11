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

@RestController
@CrossOrigin("http://localhost:4200")
class UsuarioController {
	
//	@PostMapping("user")
//	public User login(@RequestParam("user") String username, @RequestParam("password") String pwd) {
//		
//		String token = getJWTToken(username);
//		User user = new User();
//		user.setUser(username);
//		user.setToken(token);		
//		return user;
//		
//	}
	
	@PostMapping(value="/login")
	def buscarUsuario(@RequestParam("userName") String userName, @RequestParam("password") String password) {
		val usuario = RepoUsuario.instance.getByLogin(userName, password)
		if(usuario === null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró el usuario con ese username o contraseña''')
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
	
