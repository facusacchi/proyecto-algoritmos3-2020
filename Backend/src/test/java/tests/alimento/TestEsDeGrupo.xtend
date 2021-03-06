package tests.alimento

import dominio.Alimento
import dominio.Alimento.Grupo
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.assertTrue

@DisplayName("Testeamos el metodo esDeGrupo")
class TestEsDeGrupo {
	
	Alimento ajo
	
	@BeforeEach
	def void init(){
		ajo = new Alimento
		ajo.grupo = Grupo.HORTALIZAS_FRUTAS_SEMILLAS
	}
	
	@Test
	@DisplayName("A un alimento que es de determinado grupo, si le pregunto por dicho grupo tiene que ser verdadero")
	def void elGrupoDelAlimentoCoincideConElGrupoQueEstoyPreguntando(){
		assertTrue(ajo.esDeGrupo(Grupo.HORTALIZAS_FRUTAS_SEMILLAS))
	}
}