import { CondicionAlimenticia } from './condicionAlimenticia'
import { Ingrediente } from './ingrediente'
import { Usuario } from './usuario'
import * as _ from 'lodash'

export class Receta {

  constructor(public id?: number, public autor?: Usuario, public nombreDelPlato = '', public dificultad: Dificultad = 'FACIL', public calorias: number = 0, public imagen: string = "plato-default.jpg") { }
  public colaboradores: Usuario[] = []
  public ingredientes: Ingrediente[] = []
  public procesoDePreparacion: string[] = []

  static copyObject(originalObject: Receta): Receta {
    return _.cloneDeep(originalObject)
  }

  static fromJson(recetaJSON): Receta {
    return Object.assign(new Receta(), recetaJSON,
      { autor: Usuario.fromJson(recetaJSON.autor) },
      { colaboradores: recetaJSON.colaboradores.map(colaboradorJSON => Usuario.fromJson(colaboradorJSON)) },
      { ingredientes: recetaJSON.ingredientes.map(ingredienteJSON => Ingrediente.fromJson(ingredienteJSON)) })
  }

  toJSON(): any {
    return {
      ...this,
    }
  }

  esEditablePor(usuario: Usuario): boolean {
    return usuario.id == this.autor.id || this.colaboradores.some(colaborador => colaborador.id == usuario.id)
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

  condicionesInadecuadasReceta(): Set<CondicionAlimenticia> {
    return new Set(this.ingredientes.flatMap(ingrediente => ingrediente.condicionesInadecuadasIngrediente()))
  }

  getIngredientes(): Ingrediente[] {
    return this.ingredientes
  }

  cumpleCondicionDeBusqueda(valorBusqueda: string): boolean {
    return this.nombreDelPlato.toLowerCase().includes(valorBusqueda) || this.ingredientes.some(ingrediente =>
      ingrediente.alimento.nombre.toLowerCase().includes(valorBusqueda))
  }

  agregarProcesoDePreparacion(paso: string) {
    this.procesoDePreparacion.push(paso)
  }

  eliminarProcesoDePreparacion(paso: string) {
    const index = this.procesoDePreparacion.indexOf(paso);
    if (index > -1) {
      this.procesoDePreparacion.splice(index, 1);
    }
  }

  eliminarIngrediente(ingrediente: Ingrediente) {
    const index = this.ingredientes.indexOf(ingrediente);
    if (index > -1) {
      this.ingredientes.splice(index, 1);
    }
  }

  eliminarColaborador(colaborador: Usuario) {
    const index = this.colaboradores.indexOf(colaborador);
    if (index > -1) {
      this.colaboradores.splice(index, 1);
    }
  }

  esAutor(usuario: Usuario): boolean {
    return this.autor.id == usuario.id
  }

  validarIngredientes(): boolean {
		return this.ingredientes.length > 0
	}

	validarCalorias(): boolean {
		return this.calorias > 10 && this.calorias < 5000
	}

	validarProcesoDePreparacion(): boolean {
		return this.procesoDePreparacion.length > 0
	}

	esValida(): boolean {
		return this.validarIngredientes() && this.validarCalorias() && this.validarProcesoDePreparacion()
	}

}

export type Dificultad = 'FACIL' | 'MEDIA' | 'DIFICIL'