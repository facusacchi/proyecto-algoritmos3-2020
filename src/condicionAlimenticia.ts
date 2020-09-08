import { Usuario, Rutina } from "./usuario"

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
		// usuario.rutina.equals(Rutina.INTENSIVO)
	}
}

export const hipertenso = new Hipertenso()

class Diabetico implements CondicionAlimenticia {
	public subsanaCondicion(usuario: Usuario) {
		return usuario.tieneRutina('ACTIVA') || usuario.pesaMenosDe(71)
		// usuario.rutina.equals(Rutina.ACTIVA)
	}
}

export const diabetico = new Diabetico()

class Celiaco implements CondicionAlimenticia {
	public subsanaCondicion(usuario: Usuario) {
		return true
	}
}

export const celiaco = new Celiaco()