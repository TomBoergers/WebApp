import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellenuebersichtComponent } from './tabellenuebersicht.component';

describe('TabellenuebersichtComponent', () => {
  let component: TabellenuebersichtComponent;
  let fixture: ComponentFixture<TabellenuebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabellenuebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabellenuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
