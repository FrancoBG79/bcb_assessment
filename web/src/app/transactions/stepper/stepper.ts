import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
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

import { Subject, takeUntil } from 'rxjs';

import { Transaction, TransactionsService } from '../../services/transactions.service';

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
  private readonly transactionsService = inject(TransactionsService);
  private readonly cdr = inject(ChangeDetectorRef);

  getStatusClass() {
    if (this.data.StageId <= 1) return 'status-red';
    if (this.data.StageId <= 3) return 'status-orange';
    return 'status-green';
  }

  nextStage() {
    this.loading = true;
    this.transactionsService.updateStage(this.data.TransactionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.data = response.Transaction[response.Transaction.length - 1]; // Get the latest transaction
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (error: Error) => {
          this.loading = false;
          this.cdr.markForCheck();
          const errorMessage = error?.message || 'Error updating stage';
          console.error('Error updating stage:', error);
          // You could emit an event to parent component to show error toast
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
