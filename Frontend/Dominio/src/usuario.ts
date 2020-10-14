import { CondicionAlimenticia } from "./condicionAlimenticia"
import * as moment from 'moment';
import { Alimento, mapaCondiciones } from "./alimento";

const cloneDeep = require('lodash/clonedeep');

export class Usuario {
    
    constructor(
        public id?: number,
        public userName?: String,
        public password?: String,
        public nombreYApellido?: String,
        public peso?: number,
        public estatura?: number,
        public condicionesAlimenticias: CondicionAlimenticia[] = [],
        public fechaDeNacimiento: Date = new Date(),
        public alimentosPreferidos: Alimento[] = [],
        public alimentosDisgustados: Alimento[] = [],
        public rutina: Rutina = 'NADA') { }

        
    static copyObjectFromJson(usuarioJSON) {
        return cloneDeep(Usuario.fromJson(usuarioJSON))
    }

    static copyObject(originalObject: Usuario): Usuario {
        return cloneDeep(originalObject)
    }

    static fromJson(usuarioJSON): Usuario {
        return Object.assign(new Usuario(), usuarioJSON,
        {condicionesAlimenticias : usuarioJSON.condicionesAlimenticias.map(condicionJSON => mapaCondiciones[condicionJSON.toLowerCase()])},
        //{fechaDeNacimiento : new Date(usuarioJSON.fechaDeNacimiento)},
        {alimentosPreferidos : usuarioJSON.alimentosPreferidos.map(alimentoJSON => Alimento.fromJson(alimentoJSON))},
        {alimentosDisgustados : usuarioJSON.alimentosDisgustados.map(alimentoJSON => Alimento.fromJson(alimentoJSON))})
    }

    toJSON(): any {
        return {
          ...this,
        }
    }

    indiceMasaCorporal(): number {
        return this.peso / Math.pow(this.estatura, 2)
    }

    agregarCondicionAlimenticia(condicion: CondicionAlimenticia): void {
        this.condicionesAlimenticias.push(condicion)
    }

    eliminarCondicionAlimenticia(condicion: CondicionAlimenticia): void {
        this.condicionesAlimenticias.splice(this.condicionesAlimenticias.indexOf(condicion), 1)
    }

    agregarAlimentoPreferido(alimento: Alimento) {
        this.alimentosPreferidos.push(alimento)
    }

    agregarAlimentoDisgustado(alimento: Alimento) {
        this.alimentosDisgustados.push(alimento)
    }

    eliminarAlimentoPreferido(alimento: Alimento) {
        this.alimentosPreferidos.splice(this.alimentosPreferidos.indexOf(alimento), 1)
    }

    eliminarAlimentoDisgustado(alimento: Alimento) {
        this.alimentosDisgustados.splice(this.alimentosDisgustados.indexOf(alimento), 1)
    }

    imcEsSaludable(): boolean {
        return this.indiceMasaCorporal() > 18 && this.indiceMasaCorporal() < 30
    }

    esSaludable(): boolean {
        return this.imcEsSaludable() && (this.condicionesAlimenticias.length == 0 || this.subsanaCondicionesPreexistentes())
    }

    subsanaCondicionesPreexistentes(): boolean {
        return this.condicionesAlimenticias.every(condicionAlimenticia => condicionAlimenticia.subsanaCondicion(this))
    }

    esMenorDe(edad: number): boolean {
        return this.edad() < edad
    }

    edad(): number {
        return moment().diff(this.fechaDeNacimiento, 'years');
    }

    tieneGrasasEnSusAlimentosPreferidos(): boolean {
        return this.alimentosPreferidos.some(alimento => alimento.esDeGrupo("ACEITES_GRASAS_AZUCARES"))
    }

    tieneAlMenosDosFrutasEnSusAlimentosPreferidos(): boolean {
        return this.alimentosPreferidos.filter(alimento => alimento.esDeGrupo('HORTALIZAS_FRUTAS_SEMILLAS')).length >= 2
    }

    tieneRutina(rutina: Rutina): boolean {
        return rutina === this.rutina
    }

    pesaMenosDe(unPeso: number): boolean {
        return this.peso < unPeso
    }

    tieneCondicionAlimenticia(condicionAlimenticia: CondicionAlimenticia): boolean{
		return this.condicionesAlimenticias.includes(condicionAlimenticia)
	}
}

export type Rutina = 'LEVE' | 'NADA' | 'MEDIANO' | 'INTENSIVO' | 'ACTIVO'