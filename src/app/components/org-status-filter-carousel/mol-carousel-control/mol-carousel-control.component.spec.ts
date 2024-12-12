import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolCarouselControlComponent } from './mol-carousel-control.component';

describe('MolCarouselControlComponent', () => {
  let component: MolCarouselControlComponent;
  let fixture: ComponentFixture<MolCarouselControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MolCarouselControlComponent]
    });
    fixture = TestBed.createComponent(MolCarouselControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
