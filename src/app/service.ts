import { Usuario } from '../../Dominio/src/usuario'
import { Alimento } from '../../Dominio/src/alimento'
import { vegetariano, vegano, hipertenso, celiaco, CondicionAlimenticia, diabetico } from '../../Dominio/src/condicionAlimenticia'
import { Injectable } from '@angular/core'
import { Receta } from '../../Dominio/src/receta'
import { Ingrediente } from '../../Dominio/src/ingrediente'

@Injectable({
    providedIn: 'root',
})

export class Service {
    private usuarios: Usuario[] = []
    private recetas: Receta[]
    papa: Alimento
    carneVacuna: Alimento
    brocoli: Alimento
    aceitunas: Alimento
    chocolate: Alimento
    fajitasMexicanas: Receta
    nancy: Usuario
    usuarioLogueado: Usuario
    asadoAlAsador: Receta
    guisoDeLentejas: Receta
    focaccia: Receta
    usuario: Usuario

    constructor() {
        this.usuario = new Usuario(4, "lolo", "222", "Lolin", 70, 1.70, [], new Date(1970-7-17), [], "ACTIVO")
        this.asadoAlAsador = new Receta(123, this.usuario, "Asado al asador", "DIFICIL", 800, "")
        this.guisoDeLentejas = new Receta(456, this.usuario, "Guisio de lentejas", "MEDIA", 500, "")
        this.focaccia = new Receta(789, this.usuario, "Focaccia", "FACIL", 350, "")
        this.papa = new Alimento('Papa', '---', 'HORTALIZAS_FRUTAS_SEMILLAS', [hipertenso])
        this.carneVacuna = new Alimento('Carne Vacuna', '---', 'CARNES_PESCADO_HUEVO', [vegetariano, vegano])
        this.brocoli = new Alimento("Brocoli", '---', "HORTALIZAS_FRUTAS_SEMILLAS", [])
        this.aceitunas = new Alimento("Aceitunas", '---', "CEREALES_LEGUMBRES_DERIVADOS", [celiaco])
        this.chocolate = new Alimento("Chocolate", "---", "ACEITES_GRASAS_AZUCARES", [diabetico])
        this.nancy = new Usuario(10, "nan", "123", "Nancy Vargas Fernandez", 120, 1.90, [vegano], new Date(1985, 5, 7), [this.carneVacuna, this.papa], 'MEDIANO')
        this.usuarios = [
            this.nancy,
            new Usuario(1, "pepito", '123', "Pepe Palala", 95, 1.75, [vegetariano, celiaco], new Date(1991, 1, 28), [this.papa, this.chocolate], 'NADA'),
            new Usuario(2, "carlitos", 'abc', "Juan Carlos De La Hoya", 120, 1.90, [vegano], new Date(1985, 5, 7), [this.brocoli, this.aceitunas], 'MEDIANO'),
            new Usuario(3, "manolito", '456', "Manolo Palala", 80, 1.60, [hipertenso], new Date(1988, 7, 14), [this.carneVacuna], 'INTENSIVO')
        ]
        this.fajitasMexicanas = new Receta(5, this.nancy, "Fajitas Mexicanas", 'FACIL', 300, "fajitas-mexicanas.jpg")
        this.fajitasMexicanas.colaboradores = [new Usuario(8, "", "", "Rita Curita", 70, 1.50),
        new Usuario(9, "", "", "Narda Carda", 70, 1.50)]
        this.fajitasMexicanas.procesoDePreparacion = ["Cortar la carne en tiras", "Cortar los pimientos y la cebolla en tiras", "Saltear las verduras en aceite", "Agregar la carne a las verduras", "Condimentar a gusto con sal y especias", "Hacer la masa de las tortillas"]
        this.fajitasMexicanas.ingredientes = [new Ingrediente(new Alimento("carne", "", "CARNES_PESCADO_HUEVO", [vegano, vegetariano]), "500gr")]
        this.recetas = [
            this.fajitasMexicanas,
            this.asadoAlAsador,
            this.guisoDeLentejas,
            this.focaccia,
            new Receta(1, new Usuario(4, '', '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 1'),
            new Receta(2, new Usuario(5,'', '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 2'),
            new Receta(3, new Usuario(6, '', '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 3'),
            new Receta(4, new Usuario(7, '', '', 'Usuario autor de receta', 80, 1.7), 'Nombre plato 4')
        ]
    }

    parsearAlimentosAString (alimentos: Alimento[]): String[] {
        const alimentosParseados: String[] = []
        alimentos.forEach(alimento => alimentosParseados.push(alimento.nombre))
        return alimentosParseados
    }

    eliminarCondicionUserLogueado(condicion: CondicionAlimenticia): void{
        this.usuarioLogueado.condicionesAlimenticias.splice(this.usuarioLogueado.condicionesAlimenticias.indexOf(condicion), 1)
    }

    agregarCondicionUserLogueado(condicion: CondicionAlimenticia): void {
        this.usuarioLogueado.condicionesAlimenticias.push(condicion)
    }

    userLogueadotieneCondicion(condicion: CondicionAlimenticia): boolean{
        return this.usuarioLogueado.condicionesAlimenticias.includes(condicion)
    }

    get getFechaDeNacimiento() {
        return this.formatearFecha(this.usuarioLogueado.fechaDeNacimiento)
    }
    
    formatearFecha(fecha: Date): String {
        const day = fecha.getDate()
        const month = fecha.getMonth()
        const year = fecha.getFullYear()
        return `${year}-${month}-${day}`
    }

    get getUsuarioLogueado(): Usuario{
        return this.usuarioLogueado
    }

    asignarUsuarioLogueado(usuario: Usuario): void{
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
    }

    buscarRecetas(): Receta[] {
        return this.recetas
    }

    getRecetaById(id: number): Receta {
        return this.recetas.find(receta => receta.id == id)
    }

}

export const service = new Service