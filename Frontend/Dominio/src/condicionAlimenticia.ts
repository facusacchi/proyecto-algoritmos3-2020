import { Usuario } from './usuario'

export interface CondicionAlimenticia {
  subsanaCondicion(usuario: Usuario): boolean
  nombre () : string

  /* fromJson(condicionJSON): CondicionAlimenticia */

}

class Vegetariano implements CondicionAlimenticia {

  /* fromJson(condicionJSON): CondicionAlimenticia {
    return Object.assign(vegetariano, condicionJSON)
  } */

  public subsanaCondicion(usuario: Usuario) {
    return usuario.esMenorDe(30) || !usuario.tieneGrasasEnSusAlimentosPreferidos()
  }

  nombre () : string {
    return "Vegetariano"
  }
}

export const vegetariano = new Vegetariano()

class Vegano implements CondicionAlimenticia {

  /* fromJson(condicionJSON): CondicionAlimenticia {
    return Object.assign(vegano, condicionJSON)
  } */

  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneAlMenosDosFrutasEnSusAlimentosPreferidos()
  }

  nombre () : string {
    return "Vegano"
  }
}

export const vegano = new Vegano()

class Hipertenso implements CondicionAlimenticia {

  /* fromJson(condicionJSON): CondicionAlimenticia {
    return Object.assign(hipertenso, condicionJSON)
  } */

  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneRutina('INTENSIVO')
  }

  nombre () : string {
    return "Hipertenso"
  }
}

export const hipertenso = new Hipertenso()

class Diabetico implements CondicionAlimenticia {

  /* fromJson(condicionJSON): CondicionAlimenticia {
    return Object.assign(diabetico, condicionJSON)
  } */
  
  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneRutina('ACTIVO') || usuario.pesaMenosDe(71)
  }

  nombre () : string {
    return "Diabético"
  }
}

export const diabetico = new Diabetico()

class Celiaco implements CondicionAlimenticia {

  /* fromJson(condicionJSON): CondicionAlimenticia {
    return Object.assign(celiaco, condicionJSON)
  } */

  public subsanaCondicion(usuario: Usuario) {
    return true
  }

  nombre () : string {
    return "Celíaco"
  }
}

export const celiaco = new Celiaco()