package tests.usuario

import org.junit.jupiter.api.DisplayName	
import org.junit.jupiter.api.Test
import tp.food.overflow.Usuario
import java.time.LocalDate
import java.util.HashSet
import tp.food.overflow.Hipertenso
import tp.food.overflow.Vegetariano
import tp.food.overflow.Alimento
import tp.food.overflow.Alimento.Grupo
import tp.food.overflow.Diabetico
import tp.food.overflow.Rutina
import static org.junit.jupiter.api.Assertions.assertTrue
import static org.junit.jupiter.api.Assertions.assertFalse

@DisplayName("Testeamos el método esValido")
class TestEsValido {
	
	Alimento banana = new Alimento => [
		nombre = "banana"
		grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
		condicionesInadecuadas = new HashSet => [
			add(Diabetico.getInstancia)
		]
		
	]
	
	def getUsuarioValido(){
		
		new Usuario => [
			 nombreYApellido = "Nancy Fernandez"
			 username = "Nann"
			 peso = 65.4
			 estatura = 1.65
			 fechaDeNacimiento = LocalDate.of(1986,4,26)
			 condicionesAlimenticias = new HashSet => [
			 	add(Hipertenso.getInstancia)
			 	add(Vegetariano.getInstancia)
			 ]
			 alimentosPreferidos = new HashSet => [
			 	add(banana)
			 ]
			 rutina = Rutina.NADA
		]
		
	}
	
	@Test
	@DisplayName("Un usuario que cumple con campos no nulos, longitud de nombre, alimento preferidos y fecha de nacimiento es valido")
	def void usuarioEsValido(){
		assertTrue(usuarioValido.esValido())
	}
	
	@Test
	@DisplayName("Un usuario sin nombre y apellido no es valido ")
	def void usuarioSinNombreYApellidoNoEsValido(){
		val usuarioSinNombre = usuarioValido
		usuarioSinNombre.nombreYApellido = ""
		assertFalse(usuarioSinNombre.esValido())
	}
	
	@Test
	@DisplayName("Un usuario sin peso no es valido ")
	def void usuarioSinPesoNoEsValido(){
		val usuarioSinPeso = usuarioValido
		usuarioSinPeso.peso = null
		assertFalse(usuarioSinPeso.esValido())
	}
	
	@Test
	@DisplayName("Un usuario sin estatura no es valido")
	def void usuarioSinEstaturaNoEsValido(){
		val usuarioSinEstatura = usuarioValido
		usuarioSinEstatura.estatura = null
		assertFalse(usuarioSinEstatura.esValido())
	}
	
	@Test
	@DisplayName("Un usuario sin fecha de nacimiento no es valido")
	def void usuarioSinFechaDeNacimientoNoEsValido(){
		val usuarioSinFechaDeNacimiento = usuarioValido
		usuarioSinFechaDeNacimiento.fechaDeNacimiento = null
		assertFalse(usuarioSinFechaDeNacimiento.esValido())
	}
	
	@Test
	@DisplayName("Un usuario sin rutina no es valido")
	def void usuarioSinRutinaNoEsValido(){
		val usuarioSinRutina = usuarioValido
		usuarioSinRutina.rutina = null
		assertFalse(usuarioSinRutina.esValido())
	}
	
	@Test
	@DisplayName("Un usuario con nombre y apellido corto no es valido")
	def void usuarioConNombreYApellidoCortoNoEsValido(){
		val usuarioNombreCorto = usuarioValido
		usuarioNombreCorto.nombreYApellido = "Nan"
		assertFalse(usuarioNombreCorto.esValido)
	}
	
	@Test
	@DisplayName("Un usuario hipertenso o diabetico y sin alimentos preferidos no es valido")
	def void usuarioHipertensoSinAlimentosPreferidosNoEsValido(){
		val usuarioHipertensoYSinPreferidos = usuarioValido
		usuarioHipertensoYSinPreferidos.condicionesAlimenticias = new HashSet => [add(Hipertenso.getInstancia)]
		usuarioHipertensoYSinPreferidos.alimentosPreferidos.clear
		assertFalse(usuarioHipertensoYSinPreferidos.esValido)
	}
	
	@Test
	@DisplayName("Un usuario con fecha de nacimiento mayor a la fecha actual no es valido")
	def void usuarioConFechaDeNacimientoMayorALaActualNoEsvalido(){
		val usuarioConFechaDeNacimientoInvalida = usuarioValido
		usuarioConFechaDeNacimientoInvalida.fechaDeNacimiento = LocalDate.now.plusDays(1)
		assertFalse(usuarioConFechaDeNacimientoInvalida.esValido)
	}
	
	


	
	
	
}