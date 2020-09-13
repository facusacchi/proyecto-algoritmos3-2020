import { Alimento } from './alimento'
import { CondicionAlimenticia } from './condicionAlimenticia'

export class Ingrediente {
  constructor(public alimento: Alimento, public cantidad: string) { }

  public condicionesInadecuadasIngrediente(): CondicionAlimenticia[] {
    return this.alimento.condicionesInadecuadas
  }
}