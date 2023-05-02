import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVornameComponent } from './table-vorname.component';

describe('TableVornameComponent', () => {
  let component: TableVornameComponent;
  let fixture: ComponentFixture<TableVornameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVornameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableVornameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
