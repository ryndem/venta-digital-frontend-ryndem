import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStatusFilterCarouselComponent } from './org-status-filter-carousel.component';

describe('StatusFilterCarouselComponent', () => {
  let component: OrgStatusFilterCarouselComponent;
  let fixture: ComponentFixture<OrgStatusFilterCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgStatusFilterCarouselComponent],
    });
    fixture = TestBed.createComponent(OrgStatusFilterCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
