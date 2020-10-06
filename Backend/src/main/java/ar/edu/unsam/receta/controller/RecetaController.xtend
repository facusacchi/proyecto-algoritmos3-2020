package ar.edu.unsam.receta.controller

import org.springframework.web.bind.annotation.RestController	
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors
import org.eclipse.xtend.lib.annotations.Data
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

import repos.Repositorio
import tp.food.overflow.Usuario
import repos.RepoUsuario

@RestController
class RecetaController {
	
	@GetMapping(value="/login/{idUsuario}")
	def buscarUsuario(@PathVariable String idUsuario) {
		RepoUsuario.instance.getById(idUsuario)
	}
	
//	@PutMapping(value="/perfilDeUsuario/{idUsuario}")
//	def reemplazarDatosUsuario(@RequestBody String idUsuario) {
//		
//	}
}
