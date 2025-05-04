import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAtividadesComponent } from './card-atividades.component';

describe('CardAtividadesComponent', () => {
  let component: CardAtividadesComponent;
  let fixture: ComponentFixture<CardAtividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAtividadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
