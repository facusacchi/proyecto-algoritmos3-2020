import { Receta } from './Receta'
import { Usuario, Rutina } from './usuario'
import { Alimento } from './alimento'
import { CondicionAlimenticia, vegetariano } from './condicionAlimenticia'
import { Ingrediente } from './ingrediente'

let receta: Receta
let usuarioVegetariano: Usuario
let alimentoParaNoVegetarianos: Alimento
let ingredienteParaNoVegetarianos: Ingrediente
const alimentosGustados: Alimento[] = []

describe('dada una receta...', () => {
    
  beforeEach(() => {
    alimentosGustados.push(alimentoParaNoVegetarianos)
    receta = new Receta(usuarioVegetariano)
    ingredienteParaNoVegetarianos = new Ingrediente(alimentoParaNoVegetarianos,'125')
    receta.agregarIngrediente(ingredienteParaNoVegetarianos)
    alimentoParaNoVegetarianos = new Alimento('papaya', 'dorada', 'HORTALIZAS_FRUTAS_SEMILLAS', [vegetariano])
    usuarioVegetariano = new Usuario('lolo', 80, 175,  [vegetariano], new Date, alimentosGustados, 'LEVE')
  })

  test('puede ser editada por un autor', () => {
    receta.setearAutor(usuarioVegetariano)
    expect(receta.esEditablePor(usuarioVegetariano)).toBe(true)
  }) 
    
  test('puede ser editada por un colaborador', () => {
    receta.agregarColaborador(usuarioVegetariano)
    expect(receta.esEditablePor(usuarioVegetariano)).toBe(true)
  })

  test('un usuario que no es autor ni colaborador, no puede editarla', () => {
    expect(receta.esEditablePor(usuarioVegetariano)).toBe(false)
  })

  test('si le pregunto por sus condiciones inadecuadas, me devuelve los valores que coincidan con dichas condiciones', () => {
    expect(receta.condicionesInadecuadasReceta()).toStrictEqual([vegetariano])
  })

})