import { TestBed } from '@angular/core/testing';

import { DetailsPresentGuard } from './details-present.guard';

fdescribe('DetailsPresentGuard', () => {
  let guard: DetailsPresentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetailsPresentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
