import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetState } from './set-state';

describe('SetState', () => {
  let component: SetState;
  let fixture: ComponentFixture<SetState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetState],
    }).compileComponents();

    fixture = TestBed.createComponent(SetState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
