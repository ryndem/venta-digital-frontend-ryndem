import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmAuthBannerComponent } from './atm-auth-banner.component';

describe('AtmAuthBannerComponent', () => {
  let component: AtmAuthBannerComponent;
  let fixture: ComponentFixture<AtmAuthBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtmAuthBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtmAuthBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
