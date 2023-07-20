import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStoryPageComponent } from './manage-story-page.component';

describe('ManageStoryPageComponent', () => {
  let component: ManageStoryPageComponent;
  let fixture: ComponentFixture<ManageStoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStoryPageComponent]
    });
    fixture = TestBed.createComponent(ManageStoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
