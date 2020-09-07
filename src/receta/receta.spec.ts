import { Receta } from './Receta'
import { Usuario } from '../usuario'

let receta: Receta
let usuarioAutor: Usuario

describe('dada una receta...', () => {
    
    beforeEach(() => {
        receta = new Receta
        usuarioAutor = new Usuario('lolo', 80, 175)
    })

    test('puede ser editada por un autor', () => {
        receta.agregarAutor(usuarioAutor)
        expect(true).toBe(receta.esEditablePor(usuarioAutor))
    }
})
