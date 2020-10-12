package appFoodOverflow.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.GetMapping
import repos.RepoReceta
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import dominio.Receta
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.DeleteMapping

@RestController
@CrossOrigin("http://localhost:4200")
class RecetaController {

	@GetMapping("/recetas")
	def recetas() {
		try {
			val recetas = RepoReceta.instance.todasLasRecetas
			ResponseEntity.ok(recetas)
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}

	@GetMapping("/receta/{id}")
	def recetaPorId(@PathVariable String id) {
		try {
			if (Integer.parseInt(id) === 0) {
				return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
			}
			val receta = RepoReceta.instance.getById(id)
			if (receta === null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró la receta de id <«id»>''')
			}
			ResponseEntity.ok(receta)
		} catch (RuntimeException e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}

	@PutMapping(value="/receta/{id}")
	def actualizar(@RequestBody String body, @PathVariable Integer id) {
		if (id === null || id === 0) {
			return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
		}
		val actualizada = mapper.readValue(body, Receta)
		if (id != actualizada.id) {
			return ResponseEntity.badRequest.body("Id en URL distinto del id que viene en el body")
		}
		RepoReceta.instance.update(actualizada)
		ResponseEntity.ok(mapper.writeValueAsString(actualizada))
	}

	@DeleteMapping(value="/receta/{id}")
	def eliminar(@PathVariable String id) {
		try {
			if (Integer.parseInt(id) === 0) {
				return ResponseEntity.badRequest.body('''Debe ingresar el parámetro id''')
			}
			val receta = RepoReceta.instance.getById(id)
			if (receta === null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body('''No se encontró la receta con id "«id»"''')
			}
			RepoReceta.instance.delete(receta)
			ResponseEntity.ok('''La receta con id "«id»" fue eliminada''')
		} catch (RuntimeException e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
}
