import { Usuario } from '../../Dominio/src/usuario'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configuration'

@Injectable({
    providedIn: 'root',
})

export class Session {
    userLogged: Usuario

    constructor(private http: HttpClient) { }

    async loginUser(userDataLogin): Promise<void> {
        const userLogged = await this.http.post(REST_SERVER_URL + '/login', userDataLogin).toPromise()
        this.userLogged = Usuario.fromJson(userLogged)
    }

    async actualizeUser(user: Usuario) :Promise<void> {
        const _user = user.toJSON()
        await this.http.post(REST_SERVER_URL + '/perfilDeUsuario', _user).toPromise()
    }
}