import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { StubRecetaService } from 'app/stub.service';
import { nancy, StubSession } from 'app/stub.session';
import { AppRoutinModule } from '../app-routing.module';

import { CondicionAlimenticiaComponent } from './condicion-alimenticia.component';

describe('CondicionAlimenticiaComponent', () => {
  let component: CondicionAlimenticiaComponent;
  let fixture: ComponentFixture<CondicionAlimenticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CondicionAlimenticiaComponent 
      ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutinModule,
        CommonModule,
      ],
    })
    .compileComponents();

    TestBed.overrideComponent(CondicionAlimenticiaComponent, {
      set: {
        providers: [
          { provide: Session, useClass: StubSession },
          { provide: Service, useClass: StubRecetaService }
        ]
      }
    })

    fixture = TestBed.createComponent(CondicionAlimenticiaComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
    component = fixture.componentInstance

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

  it('cuando una condicion es checkeada, isActive se pone en true', async () => {
    const checkboxCondicion = buscarElemento("checkbox")
    checkboxCondicion.click()
    fixture.detectChanges()
    await fixture.whenStable()
      expect(component.isActive).toBe(true)
  });

  /* it('cuando una condicion es checkeada, esta se agrega al usuario loggeado', async () => {
    const checkboxCondicion = buscarElemento("checkbox")
    checkboxCondicion.click()
    fixture.detectChanges()
    await fixture.whenStable()
    console.log(component.getCondicion())
      expect(nancy.condicionesAlimenticias.includes(component.getCondicion())).toBe(true)
  }); */
});
