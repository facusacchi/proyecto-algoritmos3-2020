import { Alimento } from "./alimento";

export class Ingrediente {
	constructor(public alimento: Alimento, public cantidad: string) { }

	public condicionesInadecuadasIngrediente() {
		return this.alimento.condicionesInadecuadas
	}
}
