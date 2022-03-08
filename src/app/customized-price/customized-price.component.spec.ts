import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedPriceComponent } from './customized-price.component';

describe('CustomizedPriceComponent', () => {
  let component: CustomizedPriceComponent;
  let fixture: ComponentFixture<CustomizedPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
