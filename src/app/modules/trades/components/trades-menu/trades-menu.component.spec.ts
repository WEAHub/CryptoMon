import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesMenuComponent } from './trades-menu.component';

describe('TradesMenuComponent', () => {
  let component: TradesMenuComponent;
  let fixture: ComponentFixture<TradesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
