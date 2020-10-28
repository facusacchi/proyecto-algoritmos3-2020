import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaComponent } from './receta.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routingComponents, AppRoutinModule } from '../app-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Service } from 'app/service';
import { StubRecetaService } from 'app/stub.service';
import { Session } from 'app/session';
import { StubSession } from 'app/stub.session';
import { ActivatedRoute } from '@angular/router';
import { Ingrediente } from '../../../../src-dominio/ingrediente';
import { Alimento } from '../../../../src-dominio/alimento';
import { vegetariano } from '../../../../src-dominio/condicionAlimenticia';

describe('RecetaComponent', () => {
  let component: RecetaComponent;
  let fixture: ComponentFixture<RecetaComponent>;

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
    }).compileComponents()

    TestBed.overrideComponent(RecetaComponent, {
      set: {
        providers: [
          { provide: ActivatedRoute, useValue: { snapshot: { params: { 'id': 1 } } } },
          { provide: Service, useClass: StubRecetaService },
          { provide: Session, useClass: StubSession },
        ]
      }
    })

    fixture = TestBed.createComponent(RecetaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el nombre del plato debe ser Asado al asador', async () => {
    fixture.detectChanges()
    const resultHtml = fixture.debugElement.nativeElement
    expect(resultHtml.querySelector('[data-testid=titulo]').textContent).toBe("Asado al asador")
  })

  it('la autora de la receta es Nancy', () => {
    fixture.detectChanges()
    const resultHtml = fixture.debugElement.nativeElement
    expect(resultHtml.querySelector('[data-testid=autor]').textContent).toBe("Nancy Vargas Fernandez")
  })

  it('al agregar carne se agrega la condicion inadecuada de vegetariano', () => {
    const resultHtml = fixture.debugElement.nativeElement
    resultHtml.querySelector('[data-testid="agregarIngrediente"]').click()
    fixture.detectChanges()
    component.receta.ingredientes = [new Ingrediente(new Alimento('Carne Vacuna', '---', 'CARNES_PESCADO_HUEVO', [vegetariano]), "1 kilo")]
    fixture.detectChanges()
    expect(resultHtml.querySelector('[data-testid=condiciones]').textContent).toBe("Vegetarianos ")
  })

});
