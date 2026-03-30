import { Component } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-transactions',
  imports: [MatToolbarModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
  standalone: true
})
export class Transactions {}
