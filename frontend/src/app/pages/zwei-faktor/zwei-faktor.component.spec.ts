import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZweiFaktorComponent } from './zwei-faktor.component';

describe('ZweiFaktorComponent', () => {
  let component: ZweiFaktorComponent;
  let fixture: ComponentFixture<ZweiFaktorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZweiFaktorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZweiFaktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
