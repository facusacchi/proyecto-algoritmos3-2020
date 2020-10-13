import { Alimento } from './alimento'
import { CondicionAlimenticia } from './condicionAlimenticia'

export class Ingrediente {
  
  constructor(public alimento?: Alimento, public cantidad?: string) { }
  
  static fromJson(ingredienteJSON: any) {
    return Object.assign(new Ingrediente(), ingredienteJSON, 
    {alimento : Alimento.fromJson(ingredienteJSON.alimento)})
  }  
  
  public condicionesInadecuadasIngrediente(): CondicionAlimenticia[] {
    return this.alimento.condicionesInadecuadas
  }
}