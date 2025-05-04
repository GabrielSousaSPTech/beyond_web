import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelDeControleHistoricoComponent } from './painel-de-controle-historico.component';

describe('PainelDeControleHistoricoComponent', () => {
  let component: PainelDeControleHistoricoComponent;
  let fixture: ComponentFixture<PainelDeControleHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelDeControleHistoricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelDeControleHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
