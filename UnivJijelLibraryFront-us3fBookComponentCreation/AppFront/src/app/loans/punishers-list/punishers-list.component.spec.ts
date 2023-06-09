import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunishersListComponent } from './punishers-list.component';

describe('PunishersListComponent', () => {
  let component: PunishersListComponent;
  let fixture: ComponentFixture<PunishersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunishersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunishersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
