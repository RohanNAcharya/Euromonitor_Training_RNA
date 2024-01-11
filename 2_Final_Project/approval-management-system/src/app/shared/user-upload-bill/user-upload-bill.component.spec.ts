import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUploadBillComponent } from './user-upload-bill.component';

describe('UserUploadBillComponent', () => {
  let component: UserUploadBillComponent;
  let fixture: ComponentFixture<UserUploadBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUploadBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserUploadBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
