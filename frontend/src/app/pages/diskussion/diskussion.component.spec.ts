import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskussionComponent } from './diskussion.component';

describe('DiskussionComponent', () => {
  let component: DiskussionComponent;
  let fixture: ComponentFixture<DiskussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiskussionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiskussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
