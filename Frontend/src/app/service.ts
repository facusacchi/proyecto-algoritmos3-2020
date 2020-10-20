import { Usuario } from '../../Dominio/src/usuario'
import { Alimento } from '../../Dominio/src/alimento'
import { vegetariano, vegano, hipertenso, celiaco, CondicionAlimenticia, diabetico } from '../../Dominio/src/condicionAlimenticia'
import { Injectable } from '@angular/core'
import { Receta } from '../../Dominio/src/receta'
import { Ingrediente } from '../../Dominio/src/ingrediente'
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configuration'

@Injectable({
    providedIn: 'root',
})

export class Service {
    
    recetaActual: Receta
    edicionReceta: boolean
    
    constructor(private http: HttpClient) { }
    static lastId = 0
    
    /* RECETA */
    
    async todasLasRecetas(): Promise<Receta[]> {
        const recetas = await this.http.get<Receta[]>(REST_SERVER_URL + '/recetas').toPromise()
        return recetas.map((receta) => Receta.fromJson(receta))
    }
    
    async getRecetaById(id: number): Promise<Receta> {
        const receta = await this.http.get<Receta>(REST_SERVER_URL + '/receta/' + id).toPromise()
        return Receta.fromJson(receta)
    }
    
    async searchReceta(recetaABuscar: string): Promise<Receta[]> {
        const recetas = await this.http.get<Receta[]>(REST_SERVER_URL + '/recetas/search/' + recetaABuscar).toPromise()
        return recetas.map((receta) => Receta.fromJson(receta))
    }
    
    async actualizarReceta(receta: Receta) {
        await this.http.put(REST_SERVER_URL + '/receta/' + receta.id, receta.toJSON()).toPromise()
    }
    
    async eliminarReceta(receta: Receta): Promise<void> {
        /* this.recetas.splice(this.recetas.indexOf(receta), 1) */
        await this.http.delete(REST_SERVER_URL + '/receta/' + receta.id).toPromise()
    }
    
    lastId(): number {
        Service.lastId = Service.lastId + 1
        return Service.lastId
    }
    
    get getRecetaActual(): Receta {
        return this.recetaActual
    }
    
    actualizarRecetaActual(receta: Receta): void {
        this.recetaActual = receta
    }
    
    async crearReceta(receta: Receta) {
        await this.http.post(REST_SERVER_URL + '/receta/new', receta.toJSON()).toPromise()
    }


    /*USUARIO*/

    async todosLosUsuarios(): Promise<Usuario[]> {
        const recetas = await this.http.get<Usuario[]>(REST_SERVER_URL + '/usuarios').toPromise()
        return recetas.map((usuario) => Usuario.fromJson(usuario))
    }

    /* parsearAlimentosAString(alimentos: Alimento[]): String[] {
        const alimentosParseados: String[] = []
        alimentos.forEach(alimento => alimentosParseados.push(alimento.nombre))
        return alimentosParseados
    }

    eliminarCondicionUserLogueado(condicion: CondicionAlimenticia): void {
        this.usuarioLogueado.condicionesAlimenticias.splice(this.usuarioLogueado.condicionesAlimenticias.indexOf(condicion), 1)
    }

    agregarCondicionUserLogueado(condicion: CondicionAlimenticia): void {
        this.usuarioLogueado.condicionesAlimenticias.push(condicion)
    }

    userLogueadotieneCondicion(condicion: CondicionAlimenticia): boolean {
        return this.usuarioLogueado.condicionesAlimenticias.includes(condicion)
    }

    get getUsuarioLogueado(): Usuario {
        return this.usuarioLogueado
    }

    asignarUsuarioLogueado(usuario: Usuario): void {
        this.usuarioLogueado = usuario
    }

    coincidePassword(userName: String, pssw: String): boolean {
        return this.buscarUsuarioPorUsername(userName).password == pssw
    }

    buscarUsuarioPorUsername(username: String): Usuario {
        return this.usuarios.find(user => this.sacarEspaciosYpasarAMinuscula(user.userName) == this.sacarEspaciosYpasarAMinuscula(username))
    }

    buscarUsuarioPorId(id: number): Usuario {
        return this.usuarios.find(user => user.id == id)
    }

    contieneUsuario(username: String): boolean {
        return this.usuarios.some(user => this.sacarEspaciosYpasarAMinuscula(user.userName) == this.sacarEspaciosYpasarAMinuscula(username))
    }

    sacarEspaciosYpasarAMinuscula(username: String): String {
        return username.trim().toLowerCase()
    } */

    /*ALIMENTO*/

    async todosLosAlimentos(): Promise<Alimento[]> {
        const alimentos = await this.http.get<Alimento[]>(REST_SERVER_URL + '/alimentos').toPromise()
        return alimentos.map((alimento) => Alimento.fromJson(alimento))
    }

}