import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesAddModalComponent } from './trades-add-modal.component';

describe('TradesAddModalComponent', () => {
  let component: TradesAddModalComponent;
  let fixture: ComponentFixture<TradesAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradesAddModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
