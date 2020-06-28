import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncrementDecrementService {
  value = 0;
  max = 15;
  min = 0;
  message: string;

  constructor() { }

  increment(): void {
    if (this.value < this.max) {
      this.value += 1;
      this.message = `You have ${this.max - this.value} before max`;
    } else {
      this.message = 'Maximum reached!';
    }
  }
  decrement(): void {
    if (this.value > this.min) {
      this.value -= 1;
      this.message = '';
    } else {
      this.message = 'Minimum reached!';
    }
  }
}
