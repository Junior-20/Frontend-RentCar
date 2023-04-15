import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDocumentoComponent } from './add-edit-documento.component';

describe('AddEditDocumentoComponent', () => {
  let component: AddEditDocumentoComponent;
  let fixture: ComponentFixture<AddEditDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
