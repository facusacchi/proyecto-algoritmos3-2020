import { CondicionAlimenticia } from './condicionAlimenticia'

export class Alimento {

  constructor(
    public nombre = '',
    public descripcion = '',
    public grupo: Grupo = 'HORTALIZAS_FRUTAS_SEMILLAS',
    public condicionesInadecuadas: CondicionAlimenticia[] = []) { }

  static fromJson(alimentoJSON): Alimento {
    return Object.assign(new Alimento(), alimentoJSON/* , { asignatario: Usuario.fromJSON(tareaJSON.asignadoA) } */)
  }

  toJSON(): any {
    return {
      ...this,
      /* asignatario: null,
      asignadoA: this.asignatario ? this.asignatario.nombre : '' */
    }
  }

  public agregarCondicionInadecuada(condicion: CondicionAlimenticia): void {
    this.condicionesInadecuadas.push(condicion)
  }

  public esDeGrupo(grupo: Grupo): boolean {
    return this.grupo == grupo
  }

}

export type Grupo = 'HORTALIZAS_FRUTAS_SEMILLAS' | 'CEREALES_LEGUMBRES_DERIVADOS' | 'LACTEOS_DERIVADOS' | 'CARNES_PESCADO_HUEVO' | 'ACEITES_GRASAS_AZUCARES'