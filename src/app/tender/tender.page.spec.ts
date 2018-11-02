import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderPage } from './tender.page';

describe('TenderPage', () => {
  let component: TenderPage;
  let fixture: ComponentFixture<TenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
