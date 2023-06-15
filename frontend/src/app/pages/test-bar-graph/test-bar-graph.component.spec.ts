import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBarGraphComponent } from './test-bar-graph.component';

describe('TestBarGraphComponent', () => {
  let component: TestBarGraphComponent;
  let fixture: ComponentFixture<TestBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestBarGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
