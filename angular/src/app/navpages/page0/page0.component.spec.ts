import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Page0Component } from './page0.component';

describe('Page0Component', () => {
  let component: Page0Component;
  let fixture: ComponentFixture<Page0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0Component ],
       schemas: [
       CUSTOM_ELEMENTS_SCHEMA
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
