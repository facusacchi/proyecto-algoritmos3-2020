import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaComponent } from './receta.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routingComponents, AppRoutinModule } from '../app-routing.module';
import { CondicionAlimenticiaComponent } from '../condicion-alimenticia/condicion-alimenticia.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Service } from 'app/service';
import { StubRecetaService } from 'app/stub.service';
import { Session } from 'app/session';
import { StubSession } from 'app/stub.session';

describe('RecetaComponent', () => {
  let component: RecetaComponent;
  let fixture: ComponentFixture<RecetaComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        /* AppComponent, */
        HeaderComponent,
        FooterComponent,
        routingComponents,
        CondicionAlimenticiaComponent,
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
          { provide: Service, useClass: StubRecetaService },
          { provide: Session, useClass: StubSession }
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
    expect(component.receta.nombreDelPlato).toBe("Asado al asador")
  })

  /* it('first task can be marked as done', async () => {
    const resultHtml = fixture.debugElement.nativeElement
    expect(resultHtml.querySelector('[data-testid="cumplir_1"]')).toBeTruthy()
  })

  it('when a task is done, it has 100% of completion', async () => {
    const resultHtml = fixture.debugElement.nativeElement
    resultHtml.querySelector('[data-testid="cumplir_1"]').click()
    fixture.detectChanges()
    expect(resultHtml.querySelector('[data-testid="porcentaje_1"]').textContent).toBe('100,00')
  })

  it('unassign first task', async () => {
    const resultHtml = fixture.debugElement.nativeElement
    resultHtml.querySelector('[data-testid="desasignar_1"]').click()
    fixture.detectChanges()
    expect(resultHtml.querySelector('[data-testid="asignatario_1"]').textContent).toBe('')
  })

  it('searching for second task should have one tr in tasks list', async () => {
    component.tareaBuscada = '2'
    fixture.detectChanges()
    const resultHtml = fixture.debugElement.nativeElement
    expect(resultHtml.querySelectorAll('[data-testid="fila-tarea"]').length).toBe(1)
  }) */






});
