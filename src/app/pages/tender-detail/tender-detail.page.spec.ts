import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDetailPage } from './tender-detail.page';

describe('TenderDetailPage', () => {
  let component: TenderDetailPage;
  let fixture: ComponentFixture<TenderDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
