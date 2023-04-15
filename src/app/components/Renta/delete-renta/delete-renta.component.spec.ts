import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRentaComponent } from './delete-renta.component';

describe('DeleteRentaComponent', () => {
  let component: DeleteRentaComponent;
  let fixture: ComponentFixture<DeleteRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
