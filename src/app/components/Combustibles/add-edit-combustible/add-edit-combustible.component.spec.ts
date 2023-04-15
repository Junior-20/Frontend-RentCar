import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCombustibleComponent } from './add-edit-combustible.component';

describe('AddEditCombustibleComponent', () => {
  let component: AddEditCombustibleComponent;
  let fixture: ComponentFixture<AddEditCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCombustibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
