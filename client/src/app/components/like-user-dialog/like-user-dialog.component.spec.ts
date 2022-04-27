import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeUserDialogComponent } from './like-user-dialog.component';

describe('LikeUserDialogComponent', () => {
  let component: LikeUserDialogComponent;
  let fixture: ComponentFixture<LikeUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
