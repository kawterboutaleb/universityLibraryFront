import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCatalogComponent } from './doc-catalog.component';

describe('DocCatalogComponent', () => {
  let component: DocCatalogComponent;
  let fixture: ComponentFixture<DocCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
