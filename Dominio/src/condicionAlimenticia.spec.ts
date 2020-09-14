import { Alimento } from "./alimento"
import { vegetariano, vegano, hipertenso, diabetico, celiaco } from "./condicionAlimenticia"
import { Usuario, Rutina } from "./usuario"
import moment from "moment"

describe('Un usuario vegetariano', () => {
    let alimentoGrasoso: Alimento
    let alimentoNoGrasoso: Alimento
    let usuarioVegetariano: Usuario

    beforeEach(() => {
        alimentoGrasoso = new Alimento('ACEITES_GRASAS_AZUCARES')
        alimentoNoGrasoso = new Alimento('HORTALIZAS_FRUTAS_SEMILLAS')
    })

    test('subsana condicion si no es menor de 30 pero no tiene grasas en sus alimentos preferidos', () => {
        usuarioVegetariano = new Usuario('Usuario Vegetariano', 80, 1.7, [vegetariano], moment().subtract(30, 'years').toDate())
        expect(vegetariano.subsanaCondicion(usuarioVegetariano)).toBeTruthy
    })

    test('subsana condicion si es menor de 30 y tiene grasas en sus alimentos preferidos', () => {
        usuarioVegetariano = new Usuario('Usuario Vegetariano', 80, 1.7)
        usuarioVegetariano.agregarAlimentoPreferido(alimentoGrasoso)
        expect(vegetariano.subsanaCondicion(usuarioVegetariano)).toBeTruthy
    })

    test('no subsana condicion si no es menor de 30 y tiene grasas en sus alimentos preferidos', () => {
        usuarioVegetariano = new Usuario('Usuario Vegetariano', 80, 1.7, [vegetariano], moment().subtract(30, 'years').toDate())
        usuarioVegetariano.agregarAlimentoPreferido(alimentoGrasoso)
        expect(vegetariano.subsanaCondicion(usuarioVegetariano)).toBeFalsy
    })
})

describe('Un usuario vegano', () => {
    let alimentoFruta1: Alimento
    let alimentoFruta2: Alimento
    let usuarioVegano: Usuario

    beforeEach(() => {
        alimentoFruta1 = new Alimento('HORTALIZAS_FRUTAS_SEMILLAS')
        alimentoFruta2 = new Alimento('HORTALIZAS_FRUTAS_SEMILLAS')
    })

    test('subsana condicion si tiene al menos dos frutas en sus alimentos preferidos', () => {
        usuarioVegano = new Usuario('Usuario', 80, 1.7)
        usuarioVegano.agregarAlimentoPreferido(alimentoFruta1)
        usuarioVegano.agregarAlimentoPreferido(alimentoFruta2)
        expect(vegano.subsanaCondicion(usuarioVegano)).toBeTruthy
    })

    test('no subsana condicion si tiene una sola fruta en sus alimentos preferidos', () => {
        usuarioVegano = new Usuario('Usuario', 80, 1.7)
        usuarioVegano.agregarAlimentoPreferido(alimentoFruta1)
        expect(vegano.subsanaCondicion(usuarioVegano)).toBeFalsy
    })
})

describe('Un usuario hipertenso', () => {
    let usuarioHipertenso: Usuario
    let alimento: Alimento

    beforeEach(() => {
        alimento = new Alimento('HORTALIZAS_FRUTAS_SEMILLAS')
    })

    test('subsana condicion si tiene una rutina intensiva', () => {
        usuarioHipertenso = new Usuario('Usuario', 80, 1.7, [hipertenso], moment().subtract(30, 'years').toDate(), [alimento], 'INTENSIVO')
        expect(hipertenso.subsanaCondicion(usuarioHipertenso)).toBeTruthy
    })

    test('no subsana condicion si tiene una rutina que no es intensiva', () => {
        usuarioHipertenso = new Usuario('Usuario', 80, 1.7)
        expect(hipertenso.subsanaCondicion(usuarioHipertenso)).toBeFalsy
    })
})

describe('Un usuario diabetico', () => {
    let usuarioDiabetico: Usuario
    let alimento: Alimento

    beforeEach(() => {
        alimento = new Alimento('HORTALIZAS_FRUTAS_SEMILLAS')
    })

    test('subsana condicion si tiene una rutina que no es activa pero pesa menos de 71 kilos', () => {
        usuarioDiabetico = new Usuario('Usuario', 70, 1.7, [diabetico], moment().subtract(30, 'years').toDate(), [alimento], 'NADA')
        expect(diabetico.subsanaCondicion(usuarioDiabetico)).toBeTruthy
    })

    test('subsana condicion si tiene una rutina activa pero no pesa menos de 71 kilos', () => {
        usuarioDiabetico = new Usuario('Usuario', 71, 1.7, [diabetico], moment().subtract(30, 'years').toDate(), [alimento], 'ACTIVA')
        expect(diabetico.subsanaCondicion(usuarioDiabetico)).toBeTruthy
    })

    test('no subsana condicion si tiene una rutina que no es activa y no pesa menos de 71 kilos', () => {
        usuarioDiabetico = new Usuario('Usuario', 71, 1.7, [diabetico], moment().subtract(30, 'years').toDate(), [alimento], 'NADA')
        expect(diabetico.subsanaCondicion(usuarioDiabetico)).toBeFalsy
    })
})

describe('Un usuario celiaco', () => {
    let usuarioCeliaco: Usuario

    test('subsana condicion siempre', () => {
        usuarioCeliaco = new Usuario('Usuario', 80, 1.7)
        expect(celiaco.subsanaCondicion(usuarioCeliaco)).toBeTruthy
    })
})