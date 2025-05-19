import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupUpComponent } from './pup-up.component';

describe('PupUpComponent', () => {
  let component: PupUpComponent;
  let fixture: ComponentFixture<PupUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
