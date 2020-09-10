import { CondicionAlimenticia } from '../condicionAlimenticia'
import { Ingrediente } from '../ingrediente'
import { Usuario } from '../usuario'

export class Receta {

  constructor(public autor: Usuario) {}
    public colaboradores: Array<Usuario> = []
    public ingredientes: Array<Ingrediente> = []

    esEditablePor(usuario: Usuario): boolean {
      return usuario === this.autor || this.colaboradores.includes(usuario)
    }
    
    agregarColaborador(colaborador: Usuario): void {
      this.colaboradores.push(colaborador)
    }

    setearAutor(autor: Usuario): void {
      this.autor = autor
    }
    
    agregarIngrediente(ingrediente: Ingrediente): void {
      this.ingredientes.push(ingrediente)
    }
    
    condicionesInadecuadasReceta(): CondicionAlimenticia[] {
      return (this.ingredientes.flatMap( ingrediente => ingrediente.condicionesInadecuadasIngrediente()))
    }    

    getIngredientes(): Ingrediente[] {
      return this.ingredientes
    }
}

export class RecetaCompuesta extends Receta{
  public subrecetas: Array<Receta> = []

  agregarSubreceta(subreceta: Receta): void {
    this.subrecetas.push(subreceta)
  }

  condicionesInadecuadasReceta(): CondicionAlimenticia[] {
    return this.getIngredientes().flatMap(ingrediente =>  ingrediente.condicionesInadecuadasIngrediente())
  }

  getIngredientes(): Ingrediente[] {
    let _ingredientes: Ingrediente[] = []
    _ingredientes = _ingredientes.concat(this.ingredientes)
    _ingredientes = _ingredientes.concat((this.subrecetas.flatMap(receta => receta.getIngredientes())))
    return _ingredientes
  }
}