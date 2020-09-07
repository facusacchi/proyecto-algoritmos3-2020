import { CondicionAlimenticia } from "./condicionAlimenticia"

export class Usuario {

    constructor(
        public nombreYApellido: string,
        public peso: number,
        public estatura: number,
        public condicionesAlimenticias: CondicionAlimenticia[] = []) { }

    indiceMasaCorporal() {
        return this.peso / Math.pow(this.estatura, 2)
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

}