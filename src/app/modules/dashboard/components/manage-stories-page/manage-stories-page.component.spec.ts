import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStoriesPageComponent } from './manage-stories-page.component';

describe('ManageStoriesPageComponent', () => {
  let component: ManageStoriesPageComponent;
  let fixture: ComponentFixture<ManageStoriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStoriesPageComponent]
    });
    fixture = TestBed.createComponent(ManageStoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
