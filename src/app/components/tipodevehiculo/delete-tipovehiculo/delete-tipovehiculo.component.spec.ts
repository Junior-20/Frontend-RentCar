import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTipovehiculoComponent } from './delete-tipovehiculo.component';

describe('DeleteTipovehiculoComponent', () => {
  let component: DeleteTipovehiculoComponent;
  let fixture: ComponentFixture<DeleteTipovehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTipovehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTipovehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
