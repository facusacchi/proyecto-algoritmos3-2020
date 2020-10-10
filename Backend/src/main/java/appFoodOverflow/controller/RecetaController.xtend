package appFoodOverflow.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.GetMapping
import repos.RepoReceta
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin

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
		
}
	
