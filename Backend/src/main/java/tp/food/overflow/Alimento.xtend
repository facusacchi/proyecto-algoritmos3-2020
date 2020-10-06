package tp.food.overflow

import java.util.HashSet
import java.util.Set
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Alimento extends Entity{
	String nombre
	String descripcion
	Grupo grupo
	Set<CondicionAlimenticia> condicionesInadecuadas = new HashSet<CondicionAlimenticia>

	def agregarCondicionInadecuada(CondicionAlimenticia _condicion) {
		condicionesInadecuadas.add(_condicion)
	}
	
	def esDeGrupo(Grupo unGrupo) {
		grupo.equals(unGrupo)
	}
	
	enum Grupo {
		HORTALIZAS_FRUTAS_SEMILLAS,
		CEREALES_LEGUMBRES_DERIVADOS,
		LACTEOS_DERIVADOS,
		CARNES_PESCADO_HUEVO,
		ACEITES_GRASAS_AZUCARES
	}
	
	override cumpleCondicionDeBusqueda(String valorBusqueda) {
		nombre.equals(valorBusqueda) || descripcion.equals(valorBusqueda)
	}
	
}