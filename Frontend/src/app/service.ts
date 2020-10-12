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
    private usuarios: Usuario[] = []
    private recetas: Receta[]
    private alimentos: Alimento[]

    papa: Alimento
    carneVacuna: Alimento
    brocoli: Alimento
    aceitunas: Alimento
    chocolate: Alimento
    cebolla: Alimento
    pimientos: Alimento
    aceite: Alimento
    sal: Alimento

    /* usuarioLogueado: Usuario */
    nancy: Usuario
    usuario: Usuario

    fajitasMexicanas: Receta
    asadoAlAsador: Receta
    guisoDeLentejas: Receta
    focaccia: Receta
    buseca: Receta
    pollo: Receta

    constructor(private http: HttpClient) {
        /* this.usuario = new Usuario(4, "lolo", "222", "Lolin", 70, 1.70, [], new Date(1970 - 7 - 17), [], [], "ACTIVO")

        this.asadoAlAsador = new Receta(123, this.usuario, "Asado al asador", "DIFICIL", 800, "asado_al_asador.jpg")
        this.guisoDeLentejas = new Receta(456, this.usuario, "Guiso de lentejas", "MEDIA", 500, "guiso de lentejas.jpg")
        this.buseca = new Receta(455, this.usuario, "Buseca", "MEDIA", 500, "buseca.jpg")
        this.focaccia = new Receta(789, this.usuario, "Focaccia", "FACIL", 350, "focaccia2.jpg")
        this.pollo = new Receta(78, this.usuario, "Pollo al horno", "FACIL", 350, "pollo_al_horno.jpg")

        this.papa = new Alimento('Papa', '---', 'HORTALIZAS_FRUTAS_SEMILLAS', [hipertenso])
        this.carneVacuna = new Alimento('Carne Vacuna', '---', 'CARNES_PESCADO_HUEVO', [vegetariano, vegano])
        this.brocoli = new Alimento("Brocoli", '---', "HORTALIZAS_FRUTAS_SEMILLAS", [])
        this.aceitunas = new Alimento("Aceitunas", '---', "CEREALES_LEGUMBRES_DERIVADOS", [celiaco])
        this.chocolate = new Alimento("Chocolate", "---", "ACEITES_GRASAS_AZUCARES", [diabetico])
        this.cebolla = new Alimento("Cebolla", "---", "HORTALIZAS_FRUTAS_SEMILLAS")
        this.pimientos = new Alimento("Pimientos", "---", "HORTALIZAS_FRUTAS_SEMILLAS")
        this.sal = new Alimento("Sal", "---", "ACEITES_GRASAS_AZUCARES", [hipertenso])
        this.aceite = new Alimento("Aceite", "---", "ACEITES_GRASAS_AZUCARES", [hipertenso])
        this.alimentos = [
            this.papa,
            this.carneVacuna,
            this.brocoli,
            this.aceitunas,
            this.chocolate,
            this.cebolla,
            this.pimientos,
            this.sal,
            this.aceite
        ]

        this.nancy = new Usuario(10, "nan", "123", "Nancy Vargas Fernandez", 120, 1.90, [vegano], new Date(1985, 5, 7), [this.carneVacuna, this.papa], [], 'MEDIANO')

        this.focaccia.colaboradores = [this.nancy]

        this.usuarios = [
            this.usuario,
            this.nancy,
            new Usuario(1, "pepito", '123', "Pepe Palala", 95, 1.75, [vegetariano, celiaco], new Date(1991, 1, 28), [this.papa, this.chocolate], [this.brocoli, this.aceitunas], 'NADA'),
            new Usuario(2, "carlitos", 'abc', "Juan Carlos De La Hoya", 120, 1.90, [vegano], new Date(1985, 5, 7), [this.brocoli, this.aceitunas], [this.carneVacuna], 'MEDIANO'),
            new Usuario(3, "manolito", '456', "Manolo Palala", 80, 1.60, [hipertenso], new Date(1988, 7, 14), [this.carneVacuna], [this.papa, this.chocolate], 'INTENSIVO')
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
            this.buseca,
            this.pollo,
        ] */
    }
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

    /* get getRecetas(): Receta[] {
        return this.recetas
    } */

    guardarCambiosReceta(recetaActualizada: Receta) {
        // let recetaOriginal = this.getRecetaById(recetaActualizada.id)
        // recetaOriginal = recetaActualizada
    }

    /* eliminarReceta(receta: Receta): void {
        this.recetas.splice(this.recetas.indexOf(receta), 1)
    } */

    lastId(): number {
        Service.lastId = Service.lastId + 1
        return Service.lastId
    }

    /*USUARIO*/

    /* parsearAlimentosAString(alimentos: Alimento[]): String[] {
        const alimentosParseados: String[] = []
        alimentos.forEach(alimento => alimentosParseados.push(alimento.nombre))
        return alimentosParseados
    } */

    /* eliminarCondicionUserLogueado(condicion: CondicionAlimenticia): void {
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
    } */

    /* coincidePassword(userName: String, pssw: String): boolean {
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

    /* get getAlimentos(): Alimento[] {
        return this.alimentos
    } */

}