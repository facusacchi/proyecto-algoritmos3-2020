package appFoodOverflow

import dominio.Alimento
import dominio.Alimento.Grupo
import dominio.Celiaco
import dominio.Diabetico
import dominio.Hipertenso
import dominio.Rutina
import dominio.Usuario
import dominio.Vegano
import dominio.Vegetariano
import repos.RepoAlimento
import repos.RepoUsuario
import repos.RepoReceta
import dominio.Receta
import dominio.Receta.Dificultad

class Bootstrap {
	
	Alimento papa
	Alimento carneRoja
	Alimento pescado
	Alimento chocolate
	Usuario pepe
	
	def void run() {
		instanciarAlimentos
		crearUsuarios
		crearRecetas
		crearAlimentos
	}
	
	def instanciarAlimentos() {
		papa = new Alimento
		carneRoja = new Alimento
		pescado = new Alimento
		chocolate = new Alimento
	}
	
	def crearUsuarios() {
		pepe = new Usuario => [
			nombreYApellido = "Pepe Palala"
			username = "pepito"
			password = "123"
			peso = 75.0
			estatura = 1.75
			//fechaDeNacimiento = LocalDate.of(1990,7,28)	// rompe el server
			condicionesAlimenticias.add(Celiaco.getInstancia)
			alimentosPreferidos.add(carneRoja)
			alimentosDisgustados.add(papa)
			rutina = Rutina.ACTIVA
		] 
		RepoUsuario.instance.create(pepe)
		
		RepoUsuario.instance.create(new Usuario => [
			nombreYApellido = "Manolo Palala"
			username = "manolito"
			password = "456"
			peso = 120.0
			estatura = 1.87
			//fechaDeNacimiento = LocalDate.of(1995,15,4) // rompe el server
			condicionesAlimenticias.add(Vegetariano.getInstancia)
			alimentosPreferidos.add(chocolate)
			alimentosDisgustados.add(pescado)
			rutina = Rutina.LEVE
		])
	}
	
	def crearRecetas() {
		RepoReceta.instance.create(new Receta => [
			nombreDelPlato = "Fajitas Mexicanas"
			dificultad = Dificultad.FACIL
			calorias = 300
			autor = pepe
		])
		RepoReceta.instance.create(new Receta => [
			nombreDelPlato = "Focacia"
			dificultad = Dificultad.DIFICIL
			calorias = 400
			autor = pepe
		])
		
	}
	
	def crearAlimentos() {
		RepoAlimento.instance.create(papa => [
			nombre = "Papa"
			descripcion = ""
			grupo = Grupo.CEREALES_LEGUMBRES_DERIVADOS
			condicionesInadecuadas.add(Hipertenso.getInstancia)
		])
		RepoAlimento.instance.create(carneRoja => [
			nombre = "Carne roja"
			descripcion = ""
			grupo = Grupo.CARNES_PESCADO_HUEVO
			condicionesInadecuadas.add(Vegetariano.getInstancia)
			condicionesInadecuadas.add(Vegano.getInstancia)
		])
		RepoAlimento.instance.create(pescado => [
			nombre = "Pescado"
			descripcion = ""
			grupo = Grupo.CARNES_PESCADO_HUEVO
			condicionesInadecuadas.add(Vegetariano.getInstancia)
			condicionesInadecuadas.add(Vegano.getInstancia)
		])
		RepoAlimento.instance.create(chocolate => [
			nombre = "Chocolate"
			descripcion = ""
			grupo = Grupo.ACEITES_GRASAS_AZUCARES
			condicionesInadecuadas.add(Diabetico.getInstancia)
		])
		
	}
	
}