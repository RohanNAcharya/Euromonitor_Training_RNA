import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewHistoryComponent } from './manager-view-history.component';

describe('ManagerViewHistoryComponent', () => {
  let component: ManagerViewHistoryComponent;
  let fixture: ComponentFixture<ManagerViewHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerViewHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerViewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
