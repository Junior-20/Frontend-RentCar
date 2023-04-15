import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipodevehiculosComponent } from './lista-tipodevehiculos.component';

describe('ListaTipodevehiculosComponent', () => {
  let component: ListaTipodevehiculosComponent;
  let fixture: ComponentFixture<ListaTipodevehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipodevehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTipodevehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
