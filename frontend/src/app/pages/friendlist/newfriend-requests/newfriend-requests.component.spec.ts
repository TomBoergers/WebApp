import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfriendRequestsComponent } from './newfriend-requests.component';

describe('NewfriendRequestsComponent', () => {
  let component: NewfriendRequestsComponent;
  let fixture: ComponentFixture<NewfriendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfriendRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewfriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
