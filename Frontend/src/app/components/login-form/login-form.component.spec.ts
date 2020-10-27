import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { StubRecetaService } from 'app/stub.service';
import { StubSession } from 'app/stub.session';
import { AppRoutinModule, routingComponents } from '../app-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LoginFormComponent,
        FooterComponent,
        PrimaryButtonComponent,
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

    TestBed.overrideComponent(LoginFormComponent, {
      set: {
        providers: [
          { provide: Session, useClass: StubSession },
          { provide: Service, useClass: StubRecetaService },
        ]
      }
    })

    fixture = TestBed.createComponent(LoginFormComponent)
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

  it('cuando ingreso user y pssw validas y le doy a ingresar el usuario e loguea correctamente', async () => {
    component.userName = "pepito"
    component.password = "123"
    fixture.detectChanges()
    await fixture.whenStable()
      const ingresar = buscarElemento('ingresar')
      ingresar.click()
    fixture.detectChanges()
    await fixture.whenStable()
      expect().toContain();
  });
});
