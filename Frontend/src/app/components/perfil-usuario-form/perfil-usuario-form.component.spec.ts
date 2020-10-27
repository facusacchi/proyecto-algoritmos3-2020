import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { StubRecetaService } from 'app/stub.service';
import { StubSession } from 'app/stub.session';
import { AppRoutinModule, routingComponents } from '../app-routing.module';
import { CardRecetaComponent } from '../card-receta/card-receta.component';
import { CondicionAlimenticiaComponent } from '../condicion-alimenticia/condicion-alimenticia.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';
import { TablaComponent } from '../tabla/tabla.component';

import { PerfilUsuarioFormComponent } from './perfil-usuario-form.component';

describe('PerfilUsuarioFormComponent', () => {
  let component: PerfilUsuarioFormComponent;
  let fixture: ComponentFixture<PerfilUsuarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PerfilUsuarioFormComponent,
        CondicionAlimenticiaComponent,
        TablaComponent,
        CardRecetaComponent,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
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
    })
    .compileComponents();

    TestBed.overrideComponent(PerfilUsuarioFormComponent, {
      set: {
        providers: [
          { provide: Session, useClass: StubSession },
          { provide: Service, useClass: StubRecetaService }
        ]
      }
    })

    fixture = TestBed.createComponent(PerfilUsuarioFormComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
    component = fixture.componentInstance

  });

  const buscarElemento = (testId: String) => {
    const compiled = fixture.debugElement.nativeElement
    return compiled.querySelector(`[data-testid="${testId}"]`)
  }

   it('should create', () => {
    expect(component).toBeTruthy();
   });

  it('el algoritmo que calcula el label del imc es la relacion entre los inputs peso/estatura**2', async () => {
    //component.usuario = 
    component.usuario.peso = 75
    component.usuario.estatura = 1.75

    fixture.detectChanges()

    fixture.whenStable().then(() => {
      const resultado = buscarElemento('imc')
      expect(resultado.textContent).toContain('24.49')
    })
  });
});
