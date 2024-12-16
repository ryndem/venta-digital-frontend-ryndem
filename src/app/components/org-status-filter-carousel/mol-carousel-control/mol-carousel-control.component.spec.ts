import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolCarouselControlComponent } from './mol-carousel-control.component';
import { NgIcon } from '@ng-icons/core';
import { By } from '@angular/platform-browser';

describe('MolCarouselControlComponent', () => {
  let component: MolCarouselControlComponent;
  let fixture: ComponentFixture<MolCarouselControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MolCarouselControlComponent],
      imports: [NgIcon],
    });
    fixture = TestBed.createComponent(MolCarouselControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have main container', () => {
    component.position = 'right';
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.debugElement.query(
      By.css('#mol-carousel-control')
    ).nativeElement;

    expect(divElement).toBeTruthy();
  });

  it('should have right position class', () => {
    component.position = 'right';
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.debugElement.query(
      By.css('#mol-carousel-control')
    ).nativeElement;

    expect(divElement.classList.contains('right')).toBeTruthy();
  });

  it('should have left position class', () => {
    component.position = 'right';
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.debugElement.query(
      By.css('#mol-carousel-control')
    ).nativeElement;

    expect(divElement.classList.contains('right')).toBeTruthy();
  });

  it('should have a button', () => {
    const button = fixture.nativeElement.querySelector('button');

    expect(button).toBeTruthy();
  });

  it('should hae ng-icon component', () => {
    const ngIcon = fixture.nativeElement.querySelector('ng-icon');

    expect(ngIcon).toBeTruthy();
  });
});
