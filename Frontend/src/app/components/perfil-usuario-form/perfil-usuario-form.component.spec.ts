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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
