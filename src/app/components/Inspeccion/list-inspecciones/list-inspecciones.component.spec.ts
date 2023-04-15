import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInspeccionesComponent } from './list-inspecciones.component';

describe('ListInspeccionesComponent', () => {
  let component: ListInspeccionesComponent;
  let fixture: ComponentFixture<ListInspeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInspeccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInspeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
