import { TestBed } from '@angular/core/testing';

import { CardFilterService } from './card-filter.service';

describe('CardFilterService', () => {
  let service: CardFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
