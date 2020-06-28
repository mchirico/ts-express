import { Component, OnInit } from '@angular/core';
import {IncrementDecrementService} from '../../service/increment-decrement.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(public incrementDecrement: IncrementDecrementService) { }
  increment(): void {
    this.incrementDecrement.increment();
  }
  decrement(): void {
    this.incrementDecrement.decrement();
  }
  ngOnInit(): void {
  }

}
