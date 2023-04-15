import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInspeccionComponent } from './delete-inspeccion.component';

describe('DeleteInspeccionComponent', () => {
  let component: DeleteInspeccionComponent;
  let fixture: ComponentFixture<DeleteInspeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInspeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
