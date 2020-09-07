import { Alimento } from "./alimento"

describe('cuando un alimento', () => {
    let alimentoHortaliza: Alimento
  
    beforeEach(() => {
        alimentoHortaliza = new Alimento()
    })
  
    test('pertenece al grupo por el que se le pregunta', () => {
      expect(true).toBe(alimentoHortaliza.esDeGrupo('HORTALIZAS_FRUTAS_SEMILLAS'))
    })
  
    test('no pertenece al grupo por el que se le pregunta', () => {
      expect(false).toBe(alimentoHortaliza.esDeGrupo('LACTEOS_DERIVADOS'))
    })
  })