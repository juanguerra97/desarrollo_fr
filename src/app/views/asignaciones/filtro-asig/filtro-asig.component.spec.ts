import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAsigComponent } from './filtro-asig.component';

describe('FiltroAsigComponent', () => {
  let component: FiltroAsigComponent;
  let fixture: ComponentFixture<FiltroAsigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAsigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
