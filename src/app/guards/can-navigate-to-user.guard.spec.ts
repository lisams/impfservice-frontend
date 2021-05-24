import { TestBed } from '@angular/core/testing';

import { CanNavigateToUserGuard } from './can-navigate-to-user.guard';

describe('CanNavigateToUserGuard', () => {
  let guard: CanNavigateToUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanNavigateToUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
