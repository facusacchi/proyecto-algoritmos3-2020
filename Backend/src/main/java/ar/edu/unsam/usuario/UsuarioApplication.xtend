package ar.edu.unsam.usuario

import org.springframework.boot.SpringApplication		
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication class UsuarioApplication {
	def static void main(String[] args) {
		new Bootstrap => [run]
		SpringApplication.run(UsuarioApplication, args)
	}
}