import { TestBed } from '@angular/core/testing';

import { CardAtividadesService } from './card-atividades.service';

describe('CardAtividadesService', () => {
  let service: CardAtividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardAtividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
