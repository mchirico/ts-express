import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1Component } from './page1.component';
import {IncrementDecrementService} from '../../service/increment-decrement.service';


describe('Page1Component', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;





  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page1Component ],
      providers: [ IncrementDecrementService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
