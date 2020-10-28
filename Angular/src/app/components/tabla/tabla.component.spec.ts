import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Service } from 'app/service';
import { Session } from 'app/session';
import { StubRecetaService } from 'app/stub.service';
import { StubSession } from 'app/stub.session';
import { Alimento } from '../../../../src-dominio/alimento';
import { AppRoutinModule, routingComponents } from '../app-routing.module';

import { TablaComponent } from './tabla.component';

describe('TablaComponent', () => {
  let component: TablaComponent;
  let fixture: ComponentFixture<TablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TablaComponent,
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
  
    TestBed.overrideComponent(TablaComponent, {
      set: {
        providers: [
          { provide: Session, useClass: StubSession },
          { provide: Service, useClass: StubRecetaService }
        ]
      }
    })

    fixture = TestBed.createComponent(TablaComponent)
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

  /* it('otro test', () => {
    const eliminar = buscarElemento("eliminar")
    eliminar.click()
    expect(component).toBeTruthy();
  }); */
});
