import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAllRequestsComponent } from './manager-all-requests.component';

describe('ManagerAllRequestsComponent', () => {
  let component: ManagerAllRequestsComponent;
  let fixture: ComponentFixture<ManagerAllRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerAllRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerAllRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
