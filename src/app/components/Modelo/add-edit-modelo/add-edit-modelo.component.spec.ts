import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditModeloComponent } from './add-edit-modelo.component';

describe('AddEditModeloComponent', () => {
  let component: AddEditModeloComponent;
  let fixture: ComponentFixture<AddEditModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditModeloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
