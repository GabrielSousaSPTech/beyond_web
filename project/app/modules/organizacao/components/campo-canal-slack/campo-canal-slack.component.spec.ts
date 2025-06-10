import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoCanalSlackComponent } from './campo-canal-slack.component';

describe('CampoCanalSlackComponent', () => {
  let component: CampoCanalSlackComponent;
  let fixture: ComponentFixture<CampoCanalSlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampoCanalSlackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoCanalSlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
