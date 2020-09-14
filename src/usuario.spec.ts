import { Usuario } from "./usuario"
import { hipertenso } from "./condicionAlimenticia"

describe('un usuario', () => {
    
    test('con imc saludable y sin condiciones alimenticias es saludable', () => {
       const usuario = new Usuario('pepe', 80 , 1.70)
       expect(usuario.esSaludable()).toBe(true)
    })
    
    test('con imc saludable, con condiciones alimenticias no subsanadas no es saludable ', () => {
        const usuario = new Usuario('pepe', 80 , 1.70, [hipertenso])
        usuario.rutina = 'LEVE'
        expect(usuario.esSaludable()).toBe(false)
    })

    test('con imc saludable, con condiciones alimenticias subsanadas es saludable ', () => {
        const usuario = new Usuario('pepe', 80 , 1.70, [hipertenso])
        usuario.rutina = "INTENSIVO"
        expect(usuario.esSaludable()).toBe(true)
    })

    test('con imc no saludable no es saludable ', () => {
        const usuario = new Usuario('pepe', 120 , 1.50)
        expect(usuario.esSaludable()).toBe(false)
    })



})
