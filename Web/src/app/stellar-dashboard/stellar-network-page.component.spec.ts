import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StellarNetworkPageComponent } from './stellar-network-page.component';

describe('StellarNetworkPageComponent', () => {
  let component: StellarNetworkPageComponent;
  let fixture: ComponentFixture<StellarNetworkPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StellarNetworkPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StellarNetworkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
