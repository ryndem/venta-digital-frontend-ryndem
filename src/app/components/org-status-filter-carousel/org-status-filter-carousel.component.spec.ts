import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStatusFilterCarouselComponent } from './org-status-filter-carousel.component';
import { MolCarouselButtonModule } from './mol-carousel-button/mol-carousel-button.module';
import { MolCarouselControlModule } from './mol-carousel-control/mol-carousel-control.module';

describe('StatusFilterCarouselComponent', () => {
  let component: OrgStatusFilterCarouselComponent;
  let fixture: ComponentFixture<OrgStatusFilterCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgStatusFilterCarouselComponent],
      imports: [MolCarouselButtonModule, MolCarouselControlModule],
    });
    fixture = TestBed.createComponent(OrgStatusFilterCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
