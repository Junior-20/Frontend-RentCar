import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentasComponent } from './list-rentas.component';

describe('ListRentasComponent', () => {
  let component: ListRentasComponent;
  let fixture: ComponentFixture<ListRentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
