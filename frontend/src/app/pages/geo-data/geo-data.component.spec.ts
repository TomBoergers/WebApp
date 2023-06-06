import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoDataComponent } from './geo-data.component';

describe('GeoDataComponent', () => {
  let component: GeoDataComponent;
  let fixture: ComponentFixture<GeoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
