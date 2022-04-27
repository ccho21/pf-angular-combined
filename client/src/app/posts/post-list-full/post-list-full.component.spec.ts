import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListFullComponent } from './post-list-full.component';

describe('PostListFullComponent', () => {
  let component: PostListFullComponent;
  let fixture: ComponentFixture<PostListFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
