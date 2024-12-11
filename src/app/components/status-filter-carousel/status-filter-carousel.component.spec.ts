import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFilterCarouselComponent } from './status-filter-carousel.component';

describe('StatusFilterCarouselComponent', () => {
  let component: StatusFilterCarouselComponent;
  let fixture: ComponentFixture<StatusFilterCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusFilterCarouselComponent]
    });
    fixture = TestBed.createComponent(StatusFilterCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
