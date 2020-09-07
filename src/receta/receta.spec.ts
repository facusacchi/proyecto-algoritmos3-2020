import { Receta } from './Receta'
import { Usuario } from '../usuario'
import { Alimento } from '../alimento'
import { CondicionAlimenticia, vegetariano, vegano } from '../condicionAlimenticia'

let receta: Receta
let usuarioVegetariano: Usuario
let alimentoParaNoVegetarianos: Alimento
let condiciones: Array<CondicionAlimenticia> = []
let alimentosGustados: Array<Alimento> = []

describe('dada una receta...', () => {
    
    beforeEach(() => {
        condiciones.push(vegetariano)
        alimentosGustados.push(alimentoParaNoVegetarianos)
        receta = new Receta(usuarioVegetariano)
        alimentoParaNoVegetarianos = new Alimento('papaya', 'dorada', 'HORTALIZAS_FRUTAS_SEMILLAS', condiciones)
        usuarioVegetariano = new Usuario('lolo', 80, 175, new Date(), condiciones, alimentosGustados, 'LEVE')
    })

    test('puede ser editada por un autor', () => {
        receta.agregarAutor(usuarioVegetariano)
        expect(true).toBe(receta.esEditablePor(usuarioVegetariano))
    }) 
    
    test('puede ser editada por un colaborador', () => {
        receta.agregarColaborador(usuarioVegetariano)
        expect(true).toBe(receta.esEditablePor(usuarioVegetariano))
    })

    test('un usuario que no es autor ni colaborador, no puede editarla', () => {
        expect(false).toBe(receta.esEditablePor(usuarioVegetariano))
    })

    test('es inadecuada para un usuario que contenga las condiciones inadecuadas de la receta', () => {
        expect(vegetariano).toBe(receta.condicionesInadecuadasReceta)  
    })

})
