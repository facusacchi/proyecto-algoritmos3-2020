package dominio

//import com.fasterxml.jackson.annotation.JsonTypeName	
//import com.fasterxml.jackson.annotation.JsonTypeInfo
//import com.fasterxml.jackson.annotation.JsonTypeInfo.As
//import com.fasterxml.jackson.annotation.JsonSubTypes

//	@JsonTypeInfo(
//	      use = JsonTypeInfo.Id.NAME, 
//	      include = As.PROPERTY, 
//	      property = "type")
//	    @JsonSubTypes(
//	        @JsonSubTypes.Type(value = Vegetariano, name = "vegetariano"),
//	        @JsonSubTypes.Type(value = Vegano, name = "vegano"),
//	        @JsonSubTypes.Type(value = Celiaco, name = "celiaco"),
//	        @JsonSubTypes.Type(value = Hipertenso, name = "hipertenso"),
//	        @JsonSubTypes.Type(value = Diabetico, name = "diabetico")
//	    )
	    
interface CondicionAlimenticia {	    
	def boolean subsanaCondicion(Usuario usuario)
	def String getAsString()
}

//@JsonTypeName("vegetariano")
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

//@JsonTypeName("vegeano")
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

//@JsonTypeName("hipertenso")
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

//@JsonTypeName("diabetico")
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

//@JsonTypeName("celiaco")
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

