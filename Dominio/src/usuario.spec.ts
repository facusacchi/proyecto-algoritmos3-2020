import { Usuario } from "./usuario"
import { hipertenso } from "./condicionAlimenticia"

describe('un usuario', () => {
    
    test('con imc saludable y sin condiciones alimenticias es saludable', () => {
       const usuario = new Usuario('pepe', 80 , 1.70)
       expect(true).toBe(usuario.esSaludable())
    })
    
    test('con imc saludable, con condiciones alimenticias no subsanadas no es saludable ', () => {
        const usuario = new Usuario('pepe', 80 , 1.70, [hipertenso])
        usuario.rutina = 'LEVE'
        expect(false).toBe(usuario.esSaludable())
    })

    test('con imc saludable, con condiciones alimenticias subsanadas es saludable ', () => {
        const usuario = new Usuario('pepe', 80 , 1.70, [hipertenso])
        usuario.rutina = "INTENSIVO"
        expect(true).toBe(usuario.esSaludable())
    })

    test('con imc no saludable no es saludable ', () => {
        const usuario = new Usuario('pepe', 120 , 1.50)
        expect(false).toBe(usuario.esSaludable())
    })



})