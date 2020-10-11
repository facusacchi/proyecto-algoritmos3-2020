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
import dominio.Ingrediente
import java.time.LocalDate

class Bootstrap {

	Alimento papa
	Alimento carneRoja
	Alimento pescado
	Alimento chocolate
	Alimento brocoli
	Alimento aceitunas
	Alimento cebolla
	Alimento pimientos
	Alimento aceite
	Alimento sal
	Ingrediente carneVacuna
	Receta focaccia
	Receta fajitasMexicanas
	Usuario pepe
	Usuario manolo
	Usuario nancy

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
		brocoli = new Alimento
		aceitunas = new Alimento
		cebolla = new Alimento
		pimientos = new Alimento
		aceite = new Alimento
		sal = new Alimento
		carneVacuna = new Ingrediente() => [alimento = carneRoja cantidad = "1 kg"]
	}

	def crearUsuarios() {
		pepe = new Usuario => [
			nombreYApellido = "Pepe Palala"
			username = "pepito"
			password = "123"
			peso = 75.0
			estatura = 1.75
			fechaDeNacimiento = LocalDate.of(1990,7,28)
			condicionesAlimenticias.add(Celiaco.getInstancia)
			alimentosPreferidos.add(carneRoja)
			alimentosDisgustados.add(papa)
			rutina = Rutina.ACTIVA
		]
		RepoUsuario.instance.create(pepe)

		manolo = new Usuario => [
			nombreYApellido = "Manolo Palala"
			username = "manolito"
			password = "456"
			peso = 120.0
			estatura = 1.87
			fechaDeNacimiento = LocalDate.of(1995,10,4)
			condicionesAlimenticias.add(Vegetariano.getInstancia)
			alimentosPreferidos.add(chocolate)
			alimentosDisgustados.add(pescado)
			rutina = Rutina.LEVE
		]
		RepoUsuario.instance.create(manolo)

		nancy = new Usuario => [
			nombreYApellido = "Nancy Vargas Fernandez"
			username = "nan"
			password = "123"
			peso = 120.0
			estatura = 1.90
			fechaDeNacimiento = LocalDate.of(1985,5,7)
			agregarCondicionAlimenticia(Vegano.getInstancia)
			agregarAlimentosPreferidos(carneRoja)
			agregarAlimentosPreferidos(papa)
			agregarAlimentoDisgustado(pescado)
			rutina = Rutina.MEDIANO
		]
		RepoUsuario.instance.create(nancy)
	}

	def crearRecetas() {
		fajitasMexicanas = new Receta => [
			nombreDelPlato = "Fajitas Mexicanas"
			dificultad = Dificultad.FACIL
			calorias = 300
			autor = nancy
			imagen = "fajitas-mexicanas.jpg"
		]
		fajitasMexicanas.agregarColaborador(manolo)
		fajitasMexicanas.agregarProcesoDePreparacion("Cortar la carne en tiras")
		fajitasMexicanas.agregarProcesoDePreparacion("Cortar los pimientos y la cebolla en tiras")
		fajitasMexicanas.agregarProcesoDePreparacion("Saltear las verduras en aceite")
		fajitasMexicanas.agregarProcesoDePreparacion("Agregar la carne a las verduras")
		fajitasMexicanas.agregarProcesoDePreparacion("Condimentar a gusto con sal y especias")
		fajitasMexicanas.agregarProcesoDePreparacion("Hacer la masa de las tortillas")
		fajitasMexicanas.agregarIngrediente(carneVacuna)
		RepoReceta.instance.create(fajitasMexicanas)

		focaccia = new Receta => [
			nombreDelPlato = "Focaccia"
			dificultad = Dificultad.DIFICIL
			calorias = 400
			autor = pepe
			imagen = "focaccia2.jpg"
		]
		focaccia.agregarColaborador(nancy)
		RepoReceta.instance.create(focaccia)

		RepoReceta.instance.create(new Receta => [
			nombreDelPlato = "Asado al asador"
			dificultad = Dificultad.MEDIA
			calorias = 800
			autor = manolo
			imagen = "asado_al_asador.jpg"
		])

		RepoReceta.instance.create(new Receta => [
			nombreDelPlato = "Guiso de lentejas"
			dificultad = Dificultad.MEDIA
			calorias = 500
			autor = manolo
			imagen = "guiso de lentejas.jpg"
		])

		RepoReceta.instance.create(new Receta => [
			nombreDelPlato = "Buseca"
			dificultad = Dificultad.DIFICIL
			calorias = 770
			autor = manolo
			imagen = "buseca.jpg"
		])

		RepoReceta.instance.create(new Receta => [
			nombreDelPlato = "Pollo al horno"
			dificultad = Dificultad.DIFICIL
			calorias = 990
			autor = pepe
			imagen = "pollo_al_horno.jpg"
		])

	}

	def crearAlimentos() {
		RepoAlimento.instance.create(papa => [
			nombre = "Papa"
			descripcion = ""
			grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
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
		RepoAlimento.instance.create(brocoli => [
			nombre = "Brocoli"
			descripcion = ""
			grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
		])

		RepoAlimento.instance.create(aceitunas => [
			nombre = "Aceitunas"
			descripcion = ""
			grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
			condicionesInadecuadas.add(Celiaco.getInstancia)
		])
		RepoAlimento.instance.create(cebolla => [
			nombre = "Cebolla"
			descripcion = ""
			grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
		])

		RepoAlimento.instance.create(pimientos => [
			nombre = "Pimientos"
			descripcion = ""
			grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
		])
		RepoAlimento.instance.create(aceite => [
			nombre = "Aceite"
			descripcion = ""
			grupo = Grupo.ACEITES_GRASAS_AZUCARES
			condicionesInadecuadas.add(Hipertenso.getInstancia)
		])

		RepoAlimento.instance.create(sal => [
			nombre = "Sal"
			descripcion = ""
			grupo = Grupo.ACEITES_GRASAS_AZUCARES
			condicionesInadecuadas.add(Hipertenso.getInstancia)
		])
	}

}
