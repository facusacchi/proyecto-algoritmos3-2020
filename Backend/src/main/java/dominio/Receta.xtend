package dominio

import java.util.ArrayList
import java.util.HashSet
import java.util.List
import java.util.Set
import org.eclipse.xtend.lib.annotations.Accessors
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty

@Accessors
class Receta extends Entity{
	String nombreDelPlato
//	@JsonIgnore 
	Usuario autor
//	@JsonIgnore 
	Set<Usuario> colaboradores = new HashSet<Usuario>
	Set<Ingrediente> ingredientes = new HashSet<Ingrediente>
	List<String> procesoDePreparacion = new ArrayList<String>
	Dificultad dificultad
	double calorias
	Receta recetaOriginal = null
	List<Accion> acciones = newArrayList
	String imagen = null
	
	new(){}
	
	new(Receta receta) {
		copiarAtributosMenosAutorYColaboradores(receta)
	}
	
	def copiarAtributosMenosAutorYColaboradores(Receta receta) {
		this.nombreDelPlato = receta.nombreDelPlato
		this.ingredientes.addAll(receta.ingredientes)
		this.procesoDePreparacion.addAll(receta.procesoDePreparacion)
		this.dificultad = receta.dificultad
		this.calorias = receta.calorias
		this.recetaOriginal = receta
	}
	
	def esEditablePor(Usuario usuario) {
		usuario == autor || colaboradores.contains(usuario)
	}

	def agregarColaborador(Usuario colaborador) {
		colaboradores.add(colaborador)
	}

	def agregarIngrediente(Ingrediente _ingrediente) {
		ingredientes.add(_ingrediente)
	}

	def agregarProcesoDePreparacion(String _proceso) {
		procesoDePreparacion.add(_proceso)
	}
	
	def eliminarProcesoDePreparacion(String proceso) {
		procesoDePreparacion.remove(proceso)
	}

	def validarIngredientes() {
		!ingredientes.empty
	}

	def validarCalorias() {
		calorias > 10 && calorias < 5000
	}

	def validarProcesoDePreparacion() {
		!procesoDePreparacion.empty
	}

	def esValida() {
		validarIngredientes && validarCalorias && validarProcesoDePreparacion
	}

	def condicionesInadecuadasReceta() {
		getIngredientes().map[condicionesInadecuadasIngrediente].flatten.toSet
	}

	enum Dificultad {
		FACIL,
		MEDIA,
		DIFICIL
	}

	def noTieneIngredientesDisgustadosPor(Usuario usuario) {
		ingredientes.forall[ingrediente|usuario.leGusta(ingrediente)]
	}

	def noEsInadecuadaPara(Usuario usuario) {
		!condicionesInadecuadasReceta.exists[condicion|usuario.tieneCondicionAlimenticia(condicion)]
	}

	def boolean satisfaceUsuario(Usuario usuario) {
		noTieneIngredientesDisgustadosPor(usuario) && noEsInadecuadaPara(usuario)
	}

	def boolean satisfaceGrupo(Set<Usuario> grupo) {
		grupo.forall[usuario|satisfaceUsuario(usuario)]
	}

	override cumpleCondicionDeBusqueda(String valorBusqueda) {
		nombreDelPlato.contains(valorBusqueda) || ingredientes.exists [ ingrediente |
			ingrediente.alimento.nombre.contains(valorBusqueda)
		]
	}
	
	def agregarAccion(Accion accion) {
		acciones.add(accion)
	}

	def ejecutarAcciones () {
		acciones.forEach[accion|accion.ejecutar(this)]
		acciones.clear
	}

	def esColaborador(Usuario usuario) {
		colaboradores.contains(usuario)
	}

	def esAutor(Usuario usuario) {
		autor.equals(usuario)
	}
	
	def Receta clonar() {
		val clon = new Receta()
		clon.copiarDesde(this)
		return clon
	}
	
	def copiarDesde(Receta receta) {
		vaciarListas()
		copiarAtributosMenosAutorYColaboradores(receta)
		this.autor = receta.autor
		this.colaboradores.addAll(receta.colaboradores)
	}
	
	def void vaciarListas() {
		this.ingredientes.clear
		this.procesoDePreparacion.clear
		this.colaboradores.clear
	}
	
	def eliminarIngrediente(Ingrediente ingrediente) {
		ingredientes.remove(ingrediente)		
	}
	
	def eliminarColaborador(Usuario colaborador) {
		colaboradores.remove(colaborador)
	}
	
//	@JsonProperty("autor")
//	def autorNombre(){
//		autor.nombreYApellido
//	}
	
//	@JsonProperty("colaboradores")
//	def Set<String> colaboradoresNombres(){
//		colaboradores.flatMap[colaborador|obtenerNombreUsuario(colaborador)].toSet
//	}
//	
//	def String obtenerNombreUsuario(Usuario _usuario){
//		_usuario.nombreYApellido
//	}

}

@Accessors
class RecetaCompuesta extends Receta {

	Set<Receta> subrecetas = new HashSet<Receta>
	
	def agregarSubreceta(Receta receta) {
		subrecetas.add(receta)
	}

	override getIngredientes() {
		val _ingredientes = new HashSet(super.ingredientes)
		_ingredientes.addAll(subrecetas.map[getIngredientes].flatten.toSet)
		_ingredientes
	}
	
	override getDificultad() {
		subrecetas.maxBy[subreceta | subreceta.dificultad.ordinal].dificultad
	}
	
	override getCalorias() {
		subrecetas.map[calorias].reduce[acum, calorias | calorias + acum]
	}
	
	override setDificultad(Dificultad dificultad) {

	}
	
	override condicionesInadecuadasReceta() {
		val condicionesInadecuadas = new HashSet(super.condicionesInadecuadasReceta)
		condicionesInadecuadas.addAll(subrecetas.flatMap[subreceta | subreceta.condicionesInadecuadasReceta].toSet)
		condicionesInadecuadas
	}
}
