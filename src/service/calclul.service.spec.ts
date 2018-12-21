import { TestBed } from '@angular/core/testing';

import { CalclulService } from './calclul.service';

describe('CalclulService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalclulService = TestBed.get(CalclulService);
    expect(service).toBeTruthy();
  });
});
