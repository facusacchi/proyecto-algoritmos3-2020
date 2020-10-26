import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Service } from 'app/service';
import { StubRecetaService } from 'app/stub.service';
import { routingComponents, AppRoutinModule } from '../app-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

import { AgregarIngredienteComponent } from './agregar-ingrediente.component';

describe('AgregarIngredienteComponent', () => {
  let component: AgregarIngredienteComponent;
  let fixture: ComponentFixture<AgregarIngredienteComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        FooterComponent,
        routingComponents,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutinModule,
        CommonModule,
      ],
    }).compileComponents();

    TestBed.overrideComponent(AgregarIngredienteComponent, {
      set: {
        providers: [
          { provide: Service, useClass: StubRecetaService },
        ]
      }
    })

    fixture = TestBed.createComponent(AgregarIngredienteComponent);
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('seleccionar un alimento', () => {
    const resultHtml = fixture.debugElement.nativeElement
    resultHtml.querySelector('[data-testid="seleccionarAlimento"]').click()
    expect(component.alimentoSeleccionado.nombre).toBe("Carne Vacuna")
    /* component.cantidad = "1 kilo"
    resultHtml.querySelector('[data-testid="aceptar"]').click()
    fixture.detectChanges()
    expect(component.receta.ingredientes).toBe([new Ingrediente(component.alimentoSeleccionado, component.cantidad)]) */
  })

});