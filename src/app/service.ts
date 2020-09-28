import { Usuario } from '../../Dominio/src/usuario'
import { Alimento } from '../../Dominio/src/alimento'
import { vegetariano, vegano, hipertenso } from '../../Dominio/src/condicionAlimenticia'
import { Injectable } from '@angular/core'
import { Receta } from '../../Dominio/src/receta'
import { Ingrediente } from '../../Dominio/src/ingrediente'

@Injectable({
    providedIn: 'root',
})

export class Service {
    private usuarios: Usuario[] = []
    private alimentos: Alimento[] = []
    private recetas: Receta[]
    papa: Alimento
    carneVacuna: Alimento
    fajitasMexicanas: Receta
    juanCarlos: Usuario
    
    constructor() {
        this.papa = new Alimento('Papa', '---', 'HORTALIZAS_FRUTAS_SEMILLAS', [hipertenso])
        this.carneVacuna = new Alimento('Carne Vacuna', '---', 'CARNES_PESCADO_HUEVO', [vegetariano, vegano])
        this.juanCarlos = new Usuario(10, "", "Juan Carlos De La Hoya", 120, 1.90, [vegano], new Date(1985, 5, 7), [this.carneVacuna], 'MEDIANO')
        this.usuarios = [
            this.juanCarlos,
            new Usuario(1, '123', "Pepe Palala", 95, 1.75, [vegetariano], new Date(1991, 1, 28), [this.papa], 'NADA'),
            new Usuario(2, 'abc',"Juan Carlos De La Hoya", 120, 1.90, [vegano], new Date(1985, 5, 7), [this.carneVacuna], 'MEDIANO'),
            new Usuario(3, '456',"Manolo Palala", 80, 1.60, [hipertenso], new Date(1988, 7, 14), [this.carneVacuna], 'INTENSIVO')
        ]
        this.fajitasMexicanas = new Receta(5, this.juanCarlos, "Fajitas Mexicanas", 'FACIL', 300)
        this.fajitasMexicanas.colaboradores = [new Usuario(8, "","Rita Curita", 70 , 1.50 ) , 
        new Usuario(9, "",  "Narda Carda", 70 , 1.50 )]
        this.fajitasMexicanas.procesoDePreparacion = ["Cortar la carne en tiras" ,"Cortar los pimientos y la cebolla en tiras", "Saltear las verduras en aceite" ,"Agregar la carne a las verduras","Condimentar a gusto con sal y especias", "Hacer la masa de las tortillas"]  
        this.fajitasMexicanas.ingredientes = [new Ingrediente (new Alimento ("carne", "" , "CARNES_PESCADO_HUEVO", [vegano, vegetariano]), "500gr")]                                     
        this.recetas = [
            this.fajitasMexicanas,
            new Receta(1,new Usuario(4, '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 1'),
            new Receta(2,new Usuario(5, '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 2'),
            new Receta(3,new Usuario(6, '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 3'),
            new Receta(4,new Usuario(7, '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 4')
        ]
    }
    
    coincidePassword(userName: String, pssw: String): boolean {
        return this.buscarUsuarioPorUsername(userName).password == pssw
    }

    buscarUsuarioPorUsername(username: String): Usuario {
        return this.usuarios.find(user => this.sacarEspaciosYpasarAMinuscula(user.nombreYApellido) == this.sacarEspaciosYpasarAMinuscula(username))
    }
    
    buscarUsuarioPorId(id: number): Usuario {
        return this.usuarios.find(user => user.id == id)
    }
    
    contieneUsuario(username: String): boolean {
        return this.usuarios.some(user => this.sacarEspaciosYpasarAMinuscula(user.nombreYApellido) == this.sacarEspaciosYpasarAMinuscula(username))
    }
    
    sacarEspaciosYpasarAMinuscula(username: String): String {
        return username.trim().toLowerCase()
    }
    
    buscarRecetas(): Receta[] {
        return this.recetas
    }
    
    busqueda(recetaABuscar: string): Receta[] {
        return this.recetas.filter(receta => !recetaABuscar || receta.cumpleCondicionDeBusqueda(recetaABuscar))
    }
    getRecetaById(id: number): Receta {
        return this.recetas.find(receta => receta.id == id)
    }
    
}

export const service = new Service