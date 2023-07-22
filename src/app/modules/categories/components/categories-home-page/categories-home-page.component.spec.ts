import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesHomePageComponent } from './categories-home-page.component';

describe('CategoriesHomePageComponent', () => {
  let component: CategoriesHomePageComponent;
  let fixture: ComponentFixture<CategoriesHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesHomePageComponent]
    });
    fixture = TestBed.createComponent(CategoriesHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
