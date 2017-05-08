import { TestBed, inject } from '@angular/core/testing';

import { StellarService } from './stellar.service';

describe('StellarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StellarService]
    });
  });

  it('should ...', inject([StellarService], (service: StellarService) => {
    expect(service).toBeTruthy();
  }));
});
