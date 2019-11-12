import { TestBed } from '@angular/core/testing';

import { SessionHelperService } from './session-helper.service';

describe('SessionHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionHelperService = TestBed.get(SessionHelperService);
    expect(service).toBeTruthy();
  });
});
