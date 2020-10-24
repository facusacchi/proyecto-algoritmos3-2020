import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioFormComponent } from './perfil-usuario-form.component';

describe('PerfilUsuarioFormComponent', () => {
  let component: PerfilUsuarioFormComponent;
  let fixture: ComponentFixture<PerfilUsuarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const buscarElemento = (testId: String) => {
    const compiled = fixture.debugElement.nativeElement
    return compiled.querySelector(`[data-testid="${testId}"]`)
  }

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  it('el algoritmo que calcula el label del imc es la relacion entre los inputs peso/estatura**2', () => {
    component.usuario.peso = 75
    component.usuario.estatura = 1.75

    fixture.detectChanges()

    fixture.whenStable().then(() => {
      const resultado = buscarElemento('imc')
      expect(resultado.textContent).toContain('24.49')
    })
  });
});
