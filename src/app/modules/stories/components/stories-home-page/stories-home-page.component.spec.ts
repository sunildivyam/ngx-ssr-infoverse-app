import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesHomePageComponent } from './stories-home-page.component';

describe('StoriesHomePageComponent', () => {
  let component: StoriesHomePageComponent;
  let fixture: ComponentFixture<StoriesHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoriesHomePageComponent]
    });
    fixture = TestBed.createComponent(StoriesHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
