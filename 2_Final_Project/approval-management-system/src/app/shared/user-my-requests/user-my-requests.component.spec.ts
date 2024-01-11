import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyRequestsComponent } from './user-my-requests.component';

describe('UserMyRequestsComponent', () => {
  let component: UserMyRequestsComponent;
  let fixture: ComponentFixture<UserMyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMyRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
