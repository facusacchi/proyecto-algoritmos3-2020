import { Receta, RecetaCompuesta } from './Receta'
import { Usuario } from './usuario'
import { Alimento } from './alimento'
import { vegetariano, vegano } from './condicionAlimenticia'
import { Ingrediente } from './ingrediente'

let receta: Receta
let recetaCompueta: RecetaCompuesta
let usuarioVegetariano: Usuario
let alimentoParaNoVegetarianos: Alimento
let alimentoParaNoVeganos: Alimento
let ingredienteParaNoVegetarianos: Ingrediente
let ingredienteParaNoVeganos: Ingrediente

describe('dada una receta...', () => {
    
  beforeEach(() => {
    receta = new Receta(usuarioVegetariano)
    recetaCompueta = new RecetaCompuesta(usuarioVegetariano)
    alimentoParaNoVegetarianos = new Alimento('papaya', 'dorada', 'HORTALIZAS_FRUTAS_SEMILLAS', [vegetariano])
    alimentoParaNoVeganos = new Alimento('Vegano', 'No', 'HORTALIZAS_FRUTAS_SEMILLAS', [vegano])
    ingredienteParaNoVegetarianos = new Ingrediente(alimentoParaNoVegetarianos, '125')
    ingredienteParaNoVeganos = new Ingrediente(alimentoParaNoVeganos, '200')
    usuarioVegetariano = new Usuario('lolo', 80, 175,  [vegetariano], new Date, [alimentoParaNoVegetarianos], 'LEVE')
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
    receta.agregarIngrediente(ingredienteParaNoVegetarianos)
    expect(receta.condicionesInadecuadasReceta()).toStrictEqual([vegetariano])
  })

  test('al ser compuesta y tener una subreceta, sus condiciones inadecuadas seran las suyas mas las de su subreceta', () => {
    receta.agregarIngrediente(ingredienteParaNoVegetarianos)
    recetaCompueta.agregarIngrediente(ingredienteParaNoVeganos)
    recetaCompueta.agregarSubreceta(receta)
    expect(recetaCompueta.condicionesInadecuadasReceta()).toStrictEqual([vegano, vegetariano])
  })

})