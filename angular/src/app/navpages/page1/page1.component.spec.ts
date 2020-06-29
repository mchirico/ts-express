import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1Component } from './page1.component';
import {IncrementDecrementService} from '../../service/increment-decrement.service';

class TestIncrementDecrementService{
  called: string[] = [];
  increment(): void {
    this.called.push('increment');
  }
  decrement(): void{
    this.called.push('decrement');
  }
  get status(): string[] {
    return this.called;
  }
}

describe('Page1Component', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;
  const testIncrementDecrementService = new TestIncrementDecrementService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page1Component ],
      providers: [
        {provide: IncrementDecrementService, useValue: testIncrementDecrementService}  ]
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


  it('should call increment and decrement', () => {
    component.increment();
    component.decrement();
    expect(testIncrementDecrementService.status).toEqual(['increment',
    'decrement']);

  });

});
