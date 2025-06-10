import { TestBed } from '@angular/core/testing';

import { SlackNotificacaoService } from './slack-notificacao.service';

describe('SlackNotificacaoService', () => {
  let service: SlackNotificacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlackNotificacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
