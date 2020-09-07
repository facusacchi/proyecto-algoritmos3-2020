import { CondicionAlimenticia } from "../condicionAlimenticia";
import { Ingrediente } from "../ingrediente";
import {Usuario} from "../usuario";
import { map } from "lodash";

export class Receta {

    public autor: Usuario
    public colaboradores: Array<Usuario> = []
    public ingredientes: Array<Ingrediente> = []

    esEditablePor(usuario: Usuario): Boolean {
        return usuario === this.autor || this.colaboradores.includes(usuario)
    }
    
    agregarColaborador(colaborador: Usuario) {
		this.colaboradores.push(colaborador)
    }
    
    agregarIngrediente(ingrediente: Ingrediente) {
		this.ingredientes.push(ingrediente)
    }
    
    condicionesInadecuadasReceta(): CondicionAlimenticia {
       return (this.ingredientes.map( ingrediente => { ingrediente.condicionesInadecuadasIngrediente() } )).flat()
    }
    
}
