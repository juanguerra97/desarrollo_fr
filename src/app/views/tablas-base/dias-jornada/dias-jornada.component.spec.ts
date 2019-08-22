import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasJornadaComponent } from './dias-jornada.component';

describe('DiasJornadaComponent', () => {
  let component: DiasJornadaComponent;
  let fixture: ComponentFixture<DiasJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiasJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiasJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
