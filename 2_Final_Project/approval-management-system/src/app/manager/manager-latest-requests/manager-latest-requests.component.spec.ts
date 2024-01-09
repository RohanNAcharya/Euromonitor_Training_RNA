import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLatestRequestsComponent } from './manager-latest-requests.component';

describe('ManagerLatestRequestsComponent', () => {
  let component: ManagerLatestRequestsComponent;
  let fixture: ComponentFixture<ManagerLatestRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerLatestRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerLatestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
