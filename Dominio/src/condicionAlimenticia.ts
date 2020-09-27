import { Usuario } from './usuario'

export interface CondicionAlimenticia {
  subsanaCondicion(usuario: Usuario): boolean
}

class Vegetariano implements CondicionAlimenticia {
  public subsanaCondicion(usuario: Usuario) {
    return usuario.esMenorDe(30) || !usuario.tieneGrasasEnSusAlimentosPreferidos()
  }
}

export const vegetariano = new Vegetariano()

class Vegano implements CondicionAlimenticia {
  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneAlMenosDosFrutasEnSusAlimentosPreferidos()
  }
}

export const vegano = new Vegano()

class Hipertenso implements CondicionAlimenticia {
  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneRutina('INTENSIVO')
  }
}

export const hipertenso = new Hipertenso()

class Diabetico implements CondicionAlimenticia {
  public subsanaCondicion(usuario: Usuario) {
    return usuario.tieneRutina('ACTIVO') || usuario.pesaMenosDe(71)
  }
}

export const diabetico = new Diabetico()

class Celiaco implements CondicionAlimenticia {
  public subsanaCondicion(usuario: Usuario) {
    return true
  }
}

export const celiaco = new Celiaco()