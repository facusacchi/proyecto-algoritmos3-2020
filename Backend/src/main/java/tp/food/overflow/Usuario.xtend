package tp.food.overflow

import org.eclipse.xtend.lib.annotations.Accessors		
import java.time.LocalDate
import java.time.Period
import java.util.HashSet
import java.util.Set
import tp.food.overflow.Alimento.Grupo
import java.util.List
import java.util.ArrayList
import java.time.LocalDateTime
import componente.observadores.Mensaje
import componente.observadores.Observador
import componente.observadores.Mail
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.format.DateTimeFormatter

@Accessors
class Usuario extends Entity {
	
	static String DATE_PATTERN = "dd/MM/yyyy"
	
	String nombreYApellido
	String username
	String password
	@JsonIgnore Double peso
	@JsonIgnore Double estatura
	@JsonIgnore LocalDate fechaDeNacimiento
	@JsonIgnore Set<CondicionAlimenticia> condicionesAlimenticias = new HashSet<CondicionAlimenticia>
	@JsonIgnore Set<Alimento> alimentosPreferidos = new HashSet<Alimento>
	@JsonIgnore Set<Alimento> alimentosDisgustados = new HashSet<Alimento>
	@JsonIgnore Rutina rutina
	@JsonIgnore List<Mensaje> mensajesInternos = new ArrayList<Mensaje>
	@JsonIgnore List<Observador> observadores = new ArrayList<Observador>
	@JsonIgnore List<Mail> mails = new ArrayList<Mail>
	
	@JsonProperty("peso")
	def pesoAsString() {
		peso.toString
	}
	
	@JsonProperty("estatura")
	def estaturaAsString() {
		estatura.toString
	}
	
	@JsonProperty("fechaDeNacimiento")
	def fechaDeNacimientoAsString() {
		formatter.format(fechaDeNacimiento)
	}
	
	def formatter() {
		DateTimeFormatter.ofPattern(DATE_PATTERN)
	}
	
	@JsonProperty("condicionesAlimenticias")
	def condicionesAsString() {
		this.condicionesAlimenticias.map[condicion | condicion.getAsString]
	}
	
	@JsonProperty("alimentosPreferidos")
	def alimentosPreferidosAsString() {
		this.alimentosPreferidos.map[alimento | alimento.nombre]
	}
	
	@JsonProperty("alimentosDisgustados")
	def alimentosDisgustadosAsString() {
		this.alimentosDisgustados.map[alimento | alimento.nombre]
	}
	
	@JsonProperty("rutina")
	def ruinaAsString() {
		this.rutina.toString
	}

	def indiceMasaCorporal() {
		peso / Math.pow(estatura, 2)
	}

	def edad() {
		val LocalDate fechaActual = LocalDate.now
		Period.between(fechaDeNacimiento, fechaActual).years
	}

	def agregarCondicionAlimenticia(CondicionAlimenticia _condicion) {
		condicionesAlimenticias.add(_condicion)
	}

	def agregarAlimentosPreferidos(Alimento _AlimetoPreferido) {
		alimentosPreferidos.add(_AlimetoPreferido)
	}

	def agregarAlimentoDisgustado(Alimento _AlimentoDigustado) {
		alimentosDisgustados.add(_AlimentoDigustado)
	}

	def imcEsSaludable() {
		indiceMasaCorporal > 18 && indiceMasaCorporal < 30
	}

	def esSaludable() {
		(imcEsSaludable && condicionesAlimenticias.isEmpty) || subsanaCondicionesPreexistentes
	}

	def esMenorDe(Integer unaEdad) {
		edad() < unaEdad
	}

	def tieneGrasasEnSusAlimentosPreferidos() {
		alimentosPreferidos.exists[alimento|alimento.esDeGrupo(Grupo.ACEITES_GRASAS_AZUCARES)]
	}

	def tieneAlMenosDosFrutasEnSusAlimentosPreferidos() {
		alimentosPreferidos.filter[alimento|alimento.esDeGrupo(Grupo.HORTALIZAS_FRUTAS_SEMILLAS)].size >= 2
	}

	def tieneRutina(Rutina unaRutina) {
		rutina == unaRutina
	}
	
	def pesaMenosDe(int unPeso) {
		peso < unPeso
	} 

	def subsanaCondicionesPreexistentes() {
		condicionesAlimenticias.forall[condicionAlimenticia|condicionAlimenticia.subsanaCondicion(this)]

	}

	def esValido() {
		camposNoNulos && longitudNombreValida && alimentoPreferidosValidos && fechaNacimientoValida
	}

	def camposNoNulos() {
		!nombreYApellido.nullOrEmpty && peso !== null && estatura !== null && fechaDeNacimiento !== null &&
			rutina !== null
	}

	def longitudNombreValida() {
		nombreYApellido.length > 4
	}

	def alimentoPreferidosValidos() {
		!esHipertensoODiabetico || !alimentosPreferidos.empty
	}

	def esHipertensoODiabetico() {
		condicionesAlimenticias.exists [ condicionAlimenticia |
			condicionAlimenticia.class == Hipertenso || condicionAlimenticia.class == Diabetico
		]
	}

	def fechaNacimientoValida() {
		fechaDeNacimiento.isBefore(LocalDate.now)
	}
	
	def copiarReceta(Receta receta){
		val copia = new Receta(receta)
		copia.autor = this
		notificarObservadores(receta)
		copia
	}
	
	def notificarObservadores(Receta receta) {
		observadores.forEach[actualizar(receta)]
	}
	
	def agregarObservador(Observador observador) {
		observadores.add(observador)
	}
	
	def quitarObservador(Observador observador) {
		observadores.remove(observador)
	}
	
	def leGusta(Ingrediente ingrediente) {
		!alimentosDisgustados.contains(ingrediente.alimento)
	}
	
	def tieneCondicionAlimenticia(CondicionAlimenticia condicionAlimenticia) {
		condicionesAlimenticias.contains(condicionAlimenticia)
	}
	
	override cumpleCondicionDeBusqueda(String valorBusqueda) {
		nombreYApellido.contains(valorBusqueda) || username.equals(valorBusqueda)
	}
	
	def recibirMensaje(Mensaje mensaje) {
		mensajesInternos.add(mensaje)
	}
	
	def accederAUnMensaje(Mensaje mensaje) {
		mensajesInternos.findFirst[message | message.equals(mensaje)]
	}
	
	def visualizarMensaje(Mensaje mensaje) {
		System.out.println(accederAUnMensaje(mensaje).cuerpo.toString
						 + accederAUnMensaje(mensaje).remitente.toString
						 + accederAUnMensaje(mensaje).fechaYHoraDeEmision.toString
		)
		mensaje.leido = true
		mensaje.fechaYHoraDeLectura = LocalDateTime.now
	}
	
	def recibirMail(Mail mail) {
		mails.add(mail)
	}
	
	def crearAccion(Accion accion, Receta receta) {
		if(!receta.esColaborador(this)) {
			throw new Exception("Solo un colaborador puede crear acciones para la receta")
		}
		receta.agregarAccion(accion)
	}

	def ejecutarAcciones(Receta receta) {
		if (!receta.esAutor(this)) {
			throw new Exception("Solo el autor puede ejecutar acciones sobre la receta")
		}
		receta.ejecutarAcciones
	}
	
}

enum Rutina {
	LEVE,
	NADA,
	MEDIANO,
	INTENSIVO,
	ACTIVA
}