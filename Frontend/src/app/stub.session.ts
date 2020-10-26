import { vegano } from '../../src-dominio/condicionAlimenticia'
import { Usuario } from '../../src-dominio/usuario'
import { ISession } from './session'

export const nancy = new Usuario(1, "nan", "123", "Nancy Vargas Fernandez", 120, 1.90, [vegano], new Date(1985, 5, 7), [/* this.carneVacuna, this.papa */], [], 'MEDIANO')

export class StubSession implements ISession {

    userLogged = nancy
    
    async actualizeUser(user: Usuario) { }

    async getUser(user: Usuario) {
        return nancy
    }

}