import { TestBed } from '@angular/core/testing';

import { CardEventService } from './card-event.service';

describe('CardEventService', () => {
  let service: CardEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
