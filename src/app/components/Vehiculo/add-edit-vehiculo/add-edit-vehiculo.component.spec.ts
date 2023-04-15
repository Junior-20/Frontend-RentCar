import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVehiculoComponent } from './add-edit-vehiculo.component';

describe('AddEditVehiculoComponent', () => {
  let component: AddEditVehiculoComponent;
  let fixture: ComponentFixture<AddEditVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
