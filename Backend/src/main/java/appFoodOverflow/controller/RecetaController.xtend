package appFoodOverflow.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.GetMapping
import repos.RepoReceta
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PathVariable

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
}
	
