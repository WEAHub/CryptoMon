import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAlertNotifyComponent } from './trade-alert-notify.component';

describe('TradeAlertNotifyComponent', () => {
  let component: TradeAlertNotifyComponent;
  let fixture: ComponentFixture<TradeAlertNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeAlertNotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeAlertNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
