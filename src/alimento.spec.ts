import { Alimento } from './alimento'

describe('cuando un alimento', () => {
  let alimentoHortaliza: Alimento

  beforeEach(() => {
    alimentoHortaliza = new Alimento('', '', 'HORTALIZAS_FRUTAS_SEMILLAS')
  })

  test('pertenece al grupo por el que se le pregunta', () => {
    expect(alimentoHortaliza.esDeGrupo('HORTALIZAS_FRUTAS_SEMILLAS')).toBe(true)
  })

  test('no pertenece al grupo por el que se le pregunta', () => {
    expect(alimentoHortaliza.esDeGrupo('LACTEOS_DERIVADOS')).toBe(false)
  })
})