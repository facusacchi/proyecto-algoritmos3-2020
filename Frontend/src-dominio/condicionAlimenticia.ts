import { Usuario } from './usuario'

export interface CondicionAlimenticia {
  subsanaCondicion(usuario: Usuario): boolean
  nombre () : string
}

class Vegetariano implements CondicionAlimenticia {

  public subsanaCondicion(usuario: Usuario) {
    return usuario.esMenorDe(30) || !usuario.tieneGrasasEnSusAlimentosPreferidos()
  }

  nombre () : string {
    return "Vegetariano"
  }
}

export const vegetariano = new Vegetariano()

class Vegano implements CondicionAlimenticia {

  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneAlMenosDosFrutasEnSusAlimentosPreferidos()
  }

  nombre () : string {
    return "Vegano"
  }
}

export const vegano = new Vegano()

class Hipertenso implements CondicionAlimenticia {

  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneRutina('INTENSIVO')
  }

  nombre () : string {
    return "Hipertenso"
  }
}

export const hipertenso = new Hipertenso()

class Diabetico implements CondicionAlimenticia {
  
  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneRutina('ACTIVO') || usuario.pesaMenosDe(71)
  }

  nombre () : string {
    return "Diabético"
  }
}

export const diabetico = new Diabetico()

class Celiaco implements CondicionAlimenticia {

  public subsanaCondicion(usuario: Usuario) {
    return true
  }

  nombre () : string {
    return "Celíaco"
  }
}

export const celiaco = new Celiaco()