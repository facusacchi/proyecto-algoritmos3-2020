import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionAlimenticiaComponent } from './condicion-alimenticia.component';

describe('CondicionAlimenticiaComponent', () => {
  let component: CondicionAlimenticiaComponent;
  let fixture: ComponentFixture<CondicionAlimenticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionAlimenticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionAlimenticiaComponent);
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

  it('cuando una condicion es checkeada, isActive se pone en true', () => {
    const checkboxCondicion = buscarElemento("checkbox")
    checkboxCondicion.click()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      const resultado = buscarElemento('checkbox')
      expect(resultado.textContent).toBe(true)
    })
  });
});
