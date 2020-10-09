package repos

import dominio.Usuario

class RepoUsuario extends Repositorio<Usuario> {
	
	static RepoUsuario instance
	
	private new() { }
	
	def static instance() {
		if(instance === null) {
			instance = new RepoUsuario
		}
		instance
	}
	
	def static restartInstance() {
		instance = new RepoUsuario
	}
	
}