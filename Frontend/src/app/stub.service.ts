import { vegano } from '../../src-dominio/condicionAlimenticia'
import { Receta } from '../../src-dominio/receta'
import { Usuario } from '../../src-dominio/usuario'
import { IService } from './service'

export const nancy = new Usuario(1, "nan", "123", "Nancy Vargas Fernandez", 120, 1.90, [vegano], new Date(1985, 5, 7), [/* this.carneVacuna, this.papa */], [], 'MEDIANO')

export class StubRecetaService implements IService {
    recetas = [
        new Receta(1, nancy, "Asado al asador", "DIFICIL", 800, "asado_al_asador.jpg"),
        new Receta(2, nancy, "Guiso de lentejas", "MEDIA", 500, "guiso de lentejas.jpg")
    ]

    usuarios = [
        nancy,
        new Usuario(2, "lolo", "222", "Lolin", 70, 1.70, [], new Date(1970 - 7 - 17), [], [], "ACTIVO")
    ]

    async todasLasRecetas() {
        return this.recetas
    }

    async getRecetaById(id: number) {
        return this.recetas.find((receta) => receta.id === id)
    }

    async actualizarReceta(receta: Receta) { }

    async todosLosUsuarios(): Promise<Usuario[]> {
        return this.usuarios
    }
}
