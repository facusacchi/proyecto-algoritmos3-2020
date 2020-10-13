import { celiaco, CondicionAlimenticia, diabetico, hipertenso, vegano, vegetariano } from './condicionAlimenticia'

export class Alimento {

  constructor(
    public nombre = '',
    public descripcion = '',
    public grupo: Grupo = 'HORTALIZAS_FRUTAS_SEMILLAS',
    public condicionesInadecuadas: CondicionAlimenticia[] = []) { }

  static fromJson(alimentoJSON): Alimento {
    return Object.assign(new Alimento(), alimentoJSON,
    {condicionesInadecuadas : alimentoJSON.condicionesInadecuadas.map(condicionJSON => mapaCondiciones[condicionJSON.toLowerCase()])})

  }

  toJSON(): any {
    return {
      ...this,
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

export const mapaCondiciones = {"vegetariano" : vegetariano , "vegano": vegano, "hipertenso" : hipertenso, "diabetico": diabetico, "celiaco": celiaco}