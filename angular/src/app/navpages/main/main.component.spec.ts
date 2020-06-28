import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {SwUpdate} from '@angular/service-worker';


class TestSwUpdate {
  count = 0;
  get isEnabled(): boolean {
    this.count += 1;
    return false;
  }

  get called(): number {
    return this.count;
  }
}




describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  const testSwUpdate = new TestSwUpdate();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [
        { provide: SwUpdate, useValue: testSwUpdate }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get called', () => {
    expect(testSwUpdate.called).toBeGreaterThanOrEqual(1);
  });
});
