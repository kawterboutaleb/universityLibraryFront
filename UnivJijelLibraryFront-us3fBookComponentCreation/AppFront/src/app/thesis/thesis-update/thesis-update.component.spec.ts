import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisUpdateComponent } from './thesis-update.component';

describe('ThesisUpdateComponent', () => {
  let component: ThesisUpdateComponent;
  let fixture: ComponentFixture<ThesisUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesisUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
