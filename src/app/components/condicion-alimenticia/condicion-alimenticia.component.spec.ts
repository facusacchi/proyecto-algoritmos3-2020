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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
