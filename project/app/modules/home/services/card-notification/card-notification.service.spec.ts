import { TestBed } from '@angular/core/testing';

import { CardNotificationService } from './card-notification.service';

describe('CardNotificationServiceService', () => {
  let service: CardNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
