package repos


import tp.food.overflow.Receta
import tp.food.overflow.Usuario
import org.eclipse.xtend.lib.annotations.Accessors
import java.util.Set

@Accessors
class RepoReceta extends Repositorio<Receta> {
	
	static RepoReceta instance
	
	private new() { }
	
	def static instance() {
		if(instance === null) {
			instance = new RepoReceta
		}
		instance
	}
	
	def static restartInstance() {
		instance = new RepoReceta
	}

	def sugerencia(Usuario usuario) {
		objects.findFirst[receta|receta.satisfaceUsuario(usuario)]
	}

	def sugerenciaGrupal(Set<Usuario> grupo) {
		val sugerencias = objects.filter[receta|receta.satisfaceGrupo(grupo)]
		if (sugerencias.size >= 1) {
			sugerencias
		} else {
			grupo.map[usuario | sugerencia(usuario)].filterNull
		}
	}
	
	def contieneAutor(Usuario autor) {
		objects.map[receta | receta.autor].contains(autor)
	}
}
