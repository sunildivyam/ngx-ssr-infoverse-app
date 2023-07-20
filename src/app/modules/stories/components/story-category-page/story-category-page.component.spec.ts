import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCategoryPageComponent } from './story-category-page.component';

describe('StoryCategoryPageComponent', () => {
  let component: StoryCategoryPageComponent;
  let fixture: ComponentFixture<StoryCategoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryCategoryPageComponent]
    });
    fixture = TestBed.createComponent(StoryCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
