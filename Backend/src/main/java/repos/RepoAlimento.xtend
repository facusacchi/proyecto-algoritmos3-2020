package repos

import tp.food.overflow.Alimento

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