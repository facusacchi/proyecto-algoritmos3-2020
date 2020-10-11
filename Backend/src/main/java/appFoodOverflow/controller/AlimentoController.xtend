package appFoodOverflow.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import repos.RepoAlimento

@RestController
@CrossOrigin("http://localhost:4200")
class AlimentoController {

	@GetMapping(value="/alimentos")
	def alimentos() {
		try {
			val alimentos = RepoAlimento.instance.allInstances
			ResponseEntity.ok(alimentos)
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.message)
		}
	}

}
