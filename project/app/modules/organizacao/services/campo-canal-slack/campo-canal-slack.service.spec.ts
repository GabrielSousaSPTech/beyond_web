import { TestBed } from '@angular/core/testing';

import { CampoCanalSlackService } from './campo-canal-slack.service';

describe('CampoCanalSlackService', () => {
  let service: CampoCanalSlackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampoCanalSlackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
