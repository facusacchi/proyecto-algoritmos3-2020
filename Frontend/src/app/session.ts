import { Usuario } from '../../src-dominio/usuario'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configuration'

@Injectable({
    providedIn: 'root',
})

export class Session {
    userLogged: Usuario
    copiaDeUsuario: Usuario

    constructor(private http: HttpClient) { }

    async loginUser(userDataLogin): Promise<void> {
        const userLogged = await this.http.post(REST_SERVER_URL + '/login', userDataLogin).toPromise()
        this.userLogged = Usuario.fromJson(userLogged)
    }

    async actualizeUser(user: Usuario) :Promise<void> {
        const userLogged = await this.http.put(REST_SERVER_URL + '/perfilDeUsuario/' + user.id, user.toJSON()).toPromise()
        this.userLogged = Usuario.fromJson(userLogged)
    }

    async getUser(user: Usuario) :Promise<void>{
        const userLogged = await this.http.get(REST_SERVER_URL + '/perfilDeUsuario/' + user.id).toPromise()
        this.userLogged = Usuario.fromJson(userLogged)
    }
}