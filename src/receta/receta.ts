import { CondicionAlimenticia } from "../condicionAlimenticia";
import { Ingrediente } from "../ingrediente";
import {Usuario} from "../usuario";
import { flatMap } from "lodash";

export class Receta {

    constructor(public autor: Usuario) {}
    public colaboradores: Array<Usuario> = []
    public ingredientes: Array<Ingrediente> = []

    esEditablePor(usuario: Usuario): Boolean {
      return usuario === this.autor || this.colaboradores.includes(usuario)
    }
    
    agregarColaborador(colaborador: Usuario) {
		  this.colaboradores.push(colaborador)
    }

    agregarAutor(autor: Usuario) {
      this.autor = autor
    }
    
    agregarIngrediente(ingrediente: Ingrediente) {
		  this.ingredientes.push(ingrediente)
    }
    
    condicionesInadecuadasReceta() {
      return (this.ingredientes.flatMap( ingrediente => { ingrediente.condicionesInadecuadasIngrediente() } ))
    }    
}

export class RecetaCompuesta extends Receta{
  public subrecetas: Array<Receta> = []

  agregarSubreceta(subreceta: Receta) {
    this.subrecetas.push(subreceta)
  }

  condicionesInadecuadasReceta() {
    return this.getIngredientes().flatMap(ingrediente => { ingrediente.condicionesInadecuadasIngrediente() })
  }

  getIngredientes() {
    var _ingredientes = []
    _ingredientes.push(this.ingredientes)
    _ingredientes.push(this.subrecetas.flatMap(receta => { receta.getIngredientes() }))
    return _ingredientes
  }
}