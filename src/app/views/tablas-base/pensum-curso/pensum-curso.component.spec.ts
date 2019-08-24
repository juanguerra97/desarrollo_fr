import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensumCursoComponent } from './pensum-curso.component';

describe('PensumCursoComponent', () => {
  let component: PensumCursoComponent;
  let fixture: ComponentFixture<PensumCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensumCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensumCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
