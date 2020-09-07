import { Receta } from './Receta'
import { Usuario } from '../usuario'
import { Alimento } from '../alimento'
import { CondicionAlimenticia, vegetariano, vegano } from '../condicionAlimenticia'

let receta: Receta
let usuario: Usuario
let alimento: Alimento
let condiciones: Array<CondicionAlimenticia> = []
let alimentosGustados: Array<Alimento> = []

describe('dada una receta...', () => {
    
    beforeEach(() => {
        condiciones.push(vegetariano)
        alimentosGustados.push(alimento)
        receta = new Receta(usuario)
        alimento = new Alimento('papaya', 'dorada', 'HORTALIZAS_FRUTAS_SEMILLAS', condiciones)
        usuario = new Usuario('lolo', 80, 175, new Date(), condiciones, alimentosGustados, 'LEVE')
    })

    test('puede ser editada por un autor', () => {
        receta.agregarAutor(usuario)
        expect(true).toBe(receta.esEditablePor(usuario))
    }) 
    
    test('puede ser editada por un colaborador', () => {
        receta.agregarColaborador(usuario)
        expect(true).toBe(receta.esEditablePor(usuario))
    })

    test('un usuario que no es autor ni colaborador, no puede editarla', () => {
        expect(false).toBe(receta.esEditablePor(usuario))
    })

})
