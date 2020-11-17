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
import componente.observadores.Mensaje
import java.time.LocalDateTime

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
	Usuario casandra
	Usuario lucrecia
	Usuario pancho
	Usuario elena

	def void run() {
		instanciarAlimentos
		crearUsuarios
		crearRecetas
		crearAlimentos
		crearMensajes
	}
	
	def crearMensajes() {
		pepe.recibirMensaje(new Mensaje => [
			destinatario = pepe
			cuerpo = "Hola pepe, como estas?"
			remitente = casandra
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(38)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(2)
			leido = false
		])
		pepe.recibirMensaje(new Mensaje => [
			destinatario = pepe
			cuerpo = "Pepe no olvides tu abrigo!"
			remitente = manolo
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(24)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(5)
			leido = true
		])
		pepe.recibirMensaje(new Mensaje => [
			destinatario = pepe
			cuerpo = "Pepe... Palala"
			remitente = nancy
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		pepe.recibirMensaje(new Mensaje => [
			destinatario = pepe
			cuerpo = "Gracias por armarme el endpoint que necesitaba, te debo una!"
			remitente = pancho
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		pepe.recibirMensaje(new Mensaje => [
			destinatario = pepe
			cuerpo = "Te deje un recado con las proximas instrucciones"
			remitente = lucrecia
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		nancy.recibirMensaje(new Mensaje => [
			destinatario = nancy
			cuerpo = "Este mensaje es para Nancy"
			remitente = pepe
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		manolo.recibirMensaje(new Mensaje => [
			destinatario = manolo
			cuerpo = "Manolo te toca hacer la funcionalidad de login"
			remitente = nancy
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		manolo.recibirMensaje(new Mensaje => [
			destinatario = manolo
			cuerpo = "Podemos utilizar PrimeReact para el maquetado"
			remitente = casandra
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		manolo.recibirMensaje(new Mensaje => [
			destinatario = manolo
			cuerpo = "¿Que tal si usamos SpringBoot para el backend?"
			remitente = manolo
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		manolo.recibirMensaje(new Mensaje => [
			destinatario = manolo
			cuerpo = "Estoy atrasado con Angular, necesito mas tiempo"
			remitente = pancho
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		lucrecia.recibirMensaje(new Mensaje => [
			destinatario = lucrecia
			cuerpo = "Tenemos que reunirnos ¿Hacemos una meet?"
			remitente = pancho
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		pancho.recibirMensaje(new Mensaje => [
			destinatario = pancho
			cuerpo = "Pancho, necesito tu confirmacion para arrancar el maquetado"
			remitente = pepe
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		pancho.recibirMensaje(new Mensaje => [
			destinatario = pancho
			cuerpo = "¿Podrias ayudarme con React?"
			remitente = elena
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
		pancho.recibirMensaje(new Mensaje => [
			destinatario = pancho
			cuerpo = "Deberiamos tener funcionalidad hecha para la semana poxima"
			remitente = nancy
			fechaYHoraDeEmision = LocalDateTime.now.minusHours(20)
			fechaYHoraDeLectura = LocalDateTime.now.plusHours(20)
			leido = false
		])
		
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
			userName = "pepito"
			password = "123"
			peso = 75.0
			estatura = 1.75
			fechaDeNacimiento = LocalDate.of(1990,7,28)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			alimentosPreferidos.add(carneRoja)
			alimentosDisgustados.add(papa)
			rutina = Rutina.ACTIVO
		]
		RepoUsuario.instance.create(pepe)

		manolo = new Usuario => [
			nombreYApellido = "Manolo Palala"
			userName = "manolito"
			password = "456"
			peso = 120.0
			estatura = 1.87
			fechaDeNacimiento = LocalDate.of(1995,10,4)
			agregarCondicionAlimenticia(Vegetariano.getInstancia)
			alimentosPreferidos.add(chocolate)
			alimentosDisgustados.add(pescado)
			rutina = Rutina.LEVE
		]
		RepoUsuario.instance.create(manolo)

		nancy = new Usuario => [
			nombreYApellido = "Nancy Vargas Fernandez"
			userName = "nan"
			password = "123"
			peso = 120.0
			estatura = 1.90
			fechaDeNacimiento = LocalDate.of(1985,5,7)
			agregarCondicionAlimenticia(Vegano.getInstancia)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			agregarAlimentosPreferidos(carneRoja)
			agregarAlimentosPreferidos(papa)
			agregarAlimentoDisgustado(pescado)
			rutina = Rutina.MEDIANO
		]
		RepoUsuario.instance.create(nancy)
		
		casandra = new Usuario => [
			nombreYApellido = "Casandra Malandra"
			userName = "casalandra"
			password = "774"
			peso = 120.0
			estatura = 1.90
			fechaDeNacimiento = LocalDate.of(1985,5,7)
			agregarCondicionAlimenticia(Vegano.getInstancia)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			agregarAlimentosPreferidos(carneRoja)
			agregarAlimentosPreferidos(papa)
			agregarAlimentoDisgustado(pescado)
			rutina = Rutina.MEDIANO
		]
		RepoUsuario.instance.create(casandra)
		
		lucrecia = new Usuario => [
			nombreYApellido = "Lucrecia Magnesia"
			userName = "lugenesia"
			password = "122"
			peso = 120.0
			estatura = 1.90
			fechaDeNacimiento = LocalDate.of(1985,5,7)
			agregarCondicionAlimenticia(Vegano.getInstancia)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			agregarAlimentosPreferidos(carneRoja)
			agregarAlimentosPreferidos(papa)
			agregarAlimentoDisgustado(pescado)
			rutina = Rutina.MEDIANO
		]
		RepoUsuario.instance.create(lucrecia)
		
		pancho = new Usuario => [
			nombreYApellido = "Pancho Rancho"
			userName = "zafarancho"
			password = "999"
			peso = 120.0
			estatura = 1.90
			fechaDeNacimiento = LocalDate.of(1985,5,7)
			agregarCondicionAlimenticia(Vegano.getInstancia)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			agregarAlimentosPreferidos(carneRoja)
			agregarAlimentosPreferidos(papa)
			agregarAlimentoDisgustado(pescado)
			rutina = Rutina.MEDIANO
		]
		RepoUsuario.instance.create(pancho)
		
		elena = new Usuario => [
			nombreYApellido = "Elena Melena"
			userName = "melinena"
			password = "364"
			peso = 120.0
			estatura = 1.90
			fechaDeNacimiento = LocalDate.of(1985,5,7)
			agregarCondicionAlimenticia(Vegano.getInstancia)
			agregarCondicionAlimenticia(Celiaco.getInstancia)
			agregarAlimentosPreferidos(carneRoja)
			agregarAlimentosPreferidos(papa)
			agregarAlimentoDisgustado(pescado)
			rutina = Rutina.MEDIANO
		]
		RepoUsuario.instance.create(elena)
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
			agregarCondicionInadecuada(Hipertenso.getInstancia)
		])

		RepoAlimento.instance.create(carneRoja => [
			nombre = "Carne roja"
			descripcion = ""
			grupo = Grupo.CARNES_PESCADO_HUEVO
			agregarCondicionInadecuada(Vegetariano.getInstancia)
			agregarCondicionInadecuada(Vegano.getInstancia)
		])

		RepoAlimento.instance.create(pescado => [
			nombre = "Pescado"
			descripcion = ""
			grupo = Grupo.CARNES_PESCADO_HUEVO
			agregarCondicionInadecuada(Vegetariano.getInstancia)
			agregarCondicionInadecuada(Vegano.getInstancia)
		])

		RepoAlimento.instance.create(chocolate => [
			nombre = "Chocolate"
			descripcion = ""
			grupo = Grupo.ACEITES_GRASAS_AZUCARES
			agregarCondicionInadecuada(Diabetico.getInstancia)
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
			agregarCondicionInadecuada(Celiaco.getInstancia)
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
			agregarCondicionInadecuada(Hipertenso.getInstancia)
		])

		RepoAlimento.instance.create(sal => [
			nombre = "Sal"
			descripcion = ""
			grupo = Grupo.ACEITES_GRASAS_AZUCARES
			agregarCondicionInadecuada(Hipertenso.getInstancia)
		])
	}

}
