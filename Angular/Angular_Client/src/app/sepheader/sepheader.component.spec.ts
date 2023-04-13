import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SEPHeaderComponent } from './sepheader.component';

describe('SEPHeaderComponent', () => {
  let component: SEPHeaderComponent;
  let fixture: ComponentFixture<SEPHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SEPHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SEPHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
