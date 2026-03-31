import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

import { Transaction } from '../../services/transactions.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-stepper',
  imports: [
    NgClass,
    MatStepperModule,
    MatDialogTitle,
    MatDialogContent,
    MatTableModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class StepperDialog {
  data: Transaction = inject(MAT_DIALOG_DATA);
  constructor() {
    console.log(this.data);
  }

  getStatusClass() {
    if (this.data.StageId <= 1) return 'status-red';
    if (this.data.StageId <= 3) return 'status-orange';
    return 'status-green';
  }
}
