import { Component, inject, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { 
  MAT_DIALOG_DATA, 
  MatDialogActions, 
  MatDialogClose,
  MatDialogContent, 
  MatDialogTitle 
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Subject } from 'rxjs';

import { Transaction } from '../../services/transactions.service';

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
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class StepperDialog implements OnDestroy {
  loading: boolean = false;
  data: Transaction = inject(MAT_DIALOG_DATA);
  private destroy$ = new Subject<void>();
  constructor() {
    console.log(this.data);
  }

  getStatusClass() {
    if (this.data.StageId <= 1) return 'status-red';
    if (this.data.StageId <= 3) return 'status-orange';
    return 'status-green';
  }

  nextStage() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
