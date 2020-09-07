import { CondicionAlimenticia } from "./condicionAlimenticia";

export class Alimento /* extends Entity */ {
	constructor(public nombre: string, public descripcion: string, public grupo: Grupo,  public condicionesInadecuadas = new Set<CondicionAlimenticia>()) {}

	public agregarCondicionInadecuada(condicion: CondicionAlimenticia) {
		return this.condicionesInadecuadas.add(condicion)
	}

	public esDeGrupo(grupo: Grupo) {
		return grupo.equals(grupo)
	}

	enum Grupo {
		HORTALIZAS_FRUTAS_SEMILLAS,
		CEREALES_LEGUMBRES_DERIVADOS,
		LACTEOS_DERIVADOS,
		CARNES_PESCADO_HUEVO,
		ACEITES_GRASAS_AZUCARES
	}

	public cumpleCondicionDeBusqueda(valorBusqueda: string) {
		return nombre.equals(valorBusqueda) || descripcion.equals(valorBusqueda)
	}

}
