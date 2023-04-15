import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTipoVehivuloComponent } from './add-edit-tipo-vehivulo.component';

describe('AddEditTipoVehivuloComponent', () => {
  let component: AddEditTipoVehivuloComponent;
  let fixture: ComponentFixture<AddEditTipoVehivuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTipoVehivuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTipoVehivuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
