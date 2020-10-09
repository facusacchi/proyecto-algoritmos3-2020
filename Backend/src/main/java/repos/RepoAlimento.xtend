package repos

import dominio.Alimento

class RepoAlimento extends Repositorio<Alimento> {
	
	static RepoAlimento instance
	
	private new() { }
	
	def static instance() {
		if(instance === null) {
			instance = new RepoAlimento
		}
		instance
	}
	
	def static restartInstance() {
		instance = new RepoAlimento
	}
	
}