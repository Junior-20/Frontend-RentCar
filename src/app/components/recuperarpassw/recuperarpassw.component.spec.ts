import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarpasswComponent } from './recuperarpassw.component';

describe('RecuperarpasswComponent', () => {
  let component: RecuperarpasswComponent;
  let fixture: ComponentFixture<RecuperarpasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarpasswComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarpasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
