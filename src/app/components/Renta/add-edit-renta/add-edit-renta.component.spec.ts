import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRentaComponent } from './add-edit-renta.component';

describe('AddEditRentaComponent', () => {
  let component: AddEditRentaComponent;
  let fixture: ComponentFixture<AddEditRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
