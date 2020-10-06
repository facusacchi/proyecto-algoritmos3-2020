package ar.edu.unsam.receta

import org.springframework.boot.SpringApplication	
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication class RecetasApplication {
	def static void main(String[] args) {
		new Bootstrap => [run]
		SpringApplication.run(RecetasApplication, args)
	}
}
