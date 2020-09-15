import { Ingrediente } from './ingrediente'
import { Alimento } from './alimento'
import { vegetariano, diabetico } from './condicionAlimenticia'

describe('Dado un ingrediente', () => {
  let ingrediente: Ingrediente
  let alimento1: Alimento

  test('obtener sus condiciones inadecuadas', () => {
    alimento1 = new Alimento()
    alimento1.agregarCondicionInadecuada(vegetariano)
    alimento1.agregarCondicionInadecuada(diabetico)
    ingrediente = new Ingrediente(alimento1, 'una taza')
    const condicionesEsperadas = [vegetariano, diabetico]
    expect(ingrediente.condicionesInadecuadasIngrediente()).toEqual(condicionesEsperadas)
  })
})