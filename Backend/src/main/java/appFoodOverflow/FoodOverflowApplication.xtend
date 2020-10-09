package appFoodOverflow

import org.springframework.boot.SpringApplication		
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication class FoodOverflowApplication {
	def static void main(String[] args) {
		new Bootstrap => [run]
		SpringApplication.run(FoodOverflowApplication, args)
	}
}