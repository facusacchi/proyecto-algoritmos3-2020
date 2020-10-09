package dominio

interface CondicionAlimenticia {

	def boolean subsanaCondicion(Usuario usuario)
	def String getAsString()
}

class Vegetariano implements CondicionAlimenticia {
	
	static Vegetariano instancia
	
	private new() {	}
	
	static def getInstancia() {
		if(instancia === null) {
			instancia = new Vegetariano
		}
		instancia
	}
	
	override subsanaCondicion(Usuario usuario) {
		usuario.esMenorDe(30) || !usuario.tieneGrasasEnSusAlimentosPreferidos()
	}
	
	override getAsString() {
		"Vegetariano"
	}

}

class Vegano implements CondicionAlimenticia {
	
	static Vegano instancia
	
	private new() {	}
	
	static def getInstancia() {
		if (instancia === null) {
			instancia = new Vegano
		}
		instancia	
	}
	
	override subsanaCondicion(Usuario usuario) {
		usuario.tieneAlMenosDosFrutasEnSusAlimentosPreferidos()
	}
	
	override getAsString() {
		"Vegano"
	}
}

class Hipertenso implements CondicionAlimenticia {
	
	static Hipertenso instancia
	
	private new() {	}
	
	static def getInstancia() {
		if(instancia === null) {
			instancia = new Hipertenso
		}
		instancia
	}

	override subsanaCondicion(Usuario usuario) {
		usuario.tieneRutina(Rutina.INTENSIVO)
	   //usuario.rutina.equals(Rutina.INTENSIVO)
	}
	
	override getAsString() {
		"Hipertenso"
	}

}

class Diabetico implements CondicionAlimenticia {
	
	static Diabetico instancia
	
	private new() {	}
	
	static def getInstancia() {
		if(instancia === null) {
			instancia = new Diabetico
		}
		instancia
	}

	override subsanaCondicion(Usuario usuario) {
		usuario.tieneRutina(Rutina.ACTIVA) || usuario.pesaMenosDe(71)
		//usuario.rutina.equals(Rutina.ACTIVA)
	}
	
	override getAsString() {
		"Diabetico"
	}

}

class Celiaco implements CondicionAlimenticia {
	
	static Celiaco instancia
	
	private new() {	}
	
	static def getInstancia() {
		if(instancia === null) {
			instancia = new Celiaco
		}
		instancia
	}

	override subsanaCondicion(Usuario usuario) {
		true
	}
	
	override getAsString() {
		"Celiaco"
	}

}

