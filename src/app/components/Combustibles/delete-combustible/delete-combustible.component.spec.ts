import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCombustibleComponent } from './delete-combustible.component';

describe('DeleteCombustibleComponent', () => {
  let component: DeleteCombustibleComponent;
  let fixture: ComponentFixture<DeleteCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCombustibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
