import { CondicionAlimenticia } from "./condicionAlimenticia"
import moment = require('moment');
import { Alimento } from "./alimento";

export class Usuario {

    constructor(
        public nombreYApellido: string,
        public peso: number,
        public estatura: number,
        public condicionesAlimenticias: CondicionAlimenticia[] = [],
        public fechaDeNacimiento: Date = new Date(),
        public alimentosPreferidos: Alimento[] = [],
        public rutina: Rutina = 'NADA') { }

    indiceMasaCorporal(): number {
        return this.peso / Math.pow(this.estatura, 2)
    }

    agregarCondicionAlimenticia(condicion: CondicionAlimenticia): void {
        this.condicionesAlimenticias.push(condicion)
    }

    agregarAlimentoPreferido(alimento: Alimento) {
		this.alimentosPreferidos.push(alimento)
	}

    imcEsSaludable(): boolean {
        return this.indiceMasaCorporal() > 18 && this.indiceMasaCorporal() < 30
    }

    esSaludable(): boolean {
        return this.imcEsSaludable() && (this.condicionesAlimenticias.length > 0 || this.subsanaCondicionesPreexistentes())
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
}

export type Rutina = 'LEVE' | 'NADA' | 'MEDIANO' | 'INTENSIVO' | 'ACTIVA'