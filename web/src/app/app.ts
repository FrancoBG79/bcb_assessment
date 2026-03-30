import { Component, signal } from '@angular/core';
import { Transactions } from './transactions/transactions';

@Component({
  selector: 'app-root',
  imports: [Transactions],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('web');
}
