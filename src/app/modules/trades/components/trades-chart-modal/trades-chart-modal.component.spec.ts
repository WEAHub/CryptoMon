import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesChartModalComponent } from './trades-chart-modal.component';

describe('TradesChartModalComponent', () => {
  let component: TradesChartModalComponent;
  let fixture: ComponentFixture<TradesChartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradesChartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
