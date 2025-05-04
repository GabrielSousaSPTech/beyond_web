import { TestBed } from '@angular/core/testing';

import { CardUserService } from './card-user.service';

describe('CardUserService', () => {
  let service: CardUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
