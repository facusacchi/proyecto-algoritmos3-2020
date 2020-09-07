import moment from 'moment'
import { CondicionAlimenticia } from "./condicionAlimenticia"
import { Alimento, Grupo } from "./alimento"

export class Usuario {

    constructor(
        public nombreYApellido: string,
        public peso: number,
        public estatura: number,
        public fechaDeNacimiento: Date,
        public condicionesAlimenticias: CondicionAlimenticia[] = [],
        public alimentosPreferidos = new Array<Alimento>(),
        public rutina: Rutina) { }

    indiceMasaCorporal() {
        return this.peso / Math.pow(this.estatura, 2)
    }

    edad() {
        return moment().diff(this.fechaDeNacimiento, 'years')
    }

    agregarCondicionAlimenticia(condicion: CondicionAlimenticia) {
        this.condicionesAlimenticias.push(condicion)
    }

    imcEsSaludable() {
        return this.indiceMasaCorporal() > 18 && this.indiceMasaCorporal() < 30
    }

    esSaludable() {
        return this.imcEsSaludable() && (this.condicionesAlimenticias.length > 0 || this.subsanaCondicionesPreexistentes())
    }

    subsanaCondicionesPreexistentes() {
        return this.condicionesAlimenticias.every(condicionAlimenticia => condicionAlimenticia.subsanaCondicion(this))
    }

    esMenorDe(edad: number) {
        return this.edad() < edad
    }

    tieneGrasasEnSusAlimentosPreferidos() {
        return this.alimentosPreferidos.some(alimento => alimento.esDeGrupo(Grupo.ACEITES_GRASAS_AZUCARES))
    }

    tieneAlMenosDosFrutasEnSusAlimentosPreferidos() {
        return this.alimentosPreferidos.filter(alimento => alimento.esDeGrupo(Grupo.HORTALIZAS_FRUTAS_SEMILLAS)).length >= 2
    }

    tieneRutina(rutina: Rutina) {
        return this.rutina == rutina
    }

    pesaMenosDe(peso: number) {
        return this.peso < peso
    }

}

export enum Rutina {
    'LEVE',
    'NADA',
    'MEDIANO',
    'INTENSIVO',
    'ACTIVA'
}