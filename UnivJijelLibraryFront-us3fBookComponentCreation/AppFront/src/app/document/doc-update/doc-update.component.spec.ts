import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUpdateComponent } from './doc-update.component';

describe('DocUpdateComponent', () => {
  let component: DocUpdateComponent;
  let fixture: ComponentFixture<DocUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
