import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsigComponent } from './lista-asig.component';

describe('ListaAsigComponent', () => {
  let component: ListaAsigComponent;
  let fixture: ComponentFixture<ListaAsigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAsigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
