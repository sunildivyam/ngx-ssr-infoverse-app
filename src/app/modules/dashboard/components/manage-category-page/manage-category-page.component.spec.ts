import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryPageComponent } from './manage-category-page.component';

describe('ManageCategoryPageComponent', () => {
  let component: ManageCategoryPageComponent;
  let fixture: ComponentFixture<ManageCategoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCategoryPageComponent]
    });
    fixture = TestBed.createComponent(ManageCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
