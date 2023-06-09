import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpacComponent } from './opac.component';

describe('OpacComponent', () => {
  let component: OpacComponent;
  let fixture: ComponentFixture<OpacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
