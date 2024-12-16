import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolCarouselButtonComponent } from './mol-carousel-button.component';

describe('MolCarouselButtonComponent', () => {
  let component: MolCarouselButtonComponent;
  let fixture: ComponentFixture<MolCarouselButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MolCarouselButtonComponent],
    });
    fixture = TestBed.createComponent(MolCarouselButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
