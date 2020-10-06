package repos

import java.util.List		
import tp.food.overflow.Entity
import java.util.Set
import java.util.HashSet
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Repositorio<T extends Entity> {

	Set<T> objects = new HashSet<T>
	int id = 1
	
	def create(T object) {
		object.id = id
		objects.add(object)
		id++
	}

	def delete(T object) {
		objects.remove(object)
	}

	def update(T object) {
		val elementoDelRepo = this.getById(object.id.toString)
		if (elementoDelRepo === null) {
			throw new Exception("No existe elemento con el id " + object.id)
		}
		delete(elementoDelRepo)
		objects.add(object)
	}//Integer.toString(object.id)
	
	def getById(String id) {
		val idInt = Integer.parseInt(id)
		objects.findFirst[object | object.id == idInt]
	}
	
	def List<T> search(String value) {
		objects.filter[object | object.cumpleCondicionDeBusqueda(value)].toList
	}
}
