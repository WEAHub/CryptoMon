import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesAlertModalComponent } from './trades-alert-modal.component';

describe('TradesAlertModalComponent', () => {
  let component: TradesAlertModalComponent;
  let fixture: ComponentFixture<TradesAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradesAlertModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
