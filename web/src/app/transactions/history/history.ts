import { Component, inject, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common'

import { MatTableDataSource } from '@angular/material/table';
import { 
  MAT_DIALOG_DATA, 
  MatDialogActions, 
  MatDialogClose, 
  MatDialogContent, 
  MatDialogTitle 
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Transaction, TransactionsList, TransactionsService } from '../../services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  imports: [
    DatePipe,
    MatDialogTitle,
    MatDialogContent,
    MatTableModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class HistoryDialog implements OnDestroy {
  loading: boolean = false;
  displayedColumns: string[] = ['id', 'status', 'updateDate'];
  
  data: TransactionsList = inject(MAT_DIALOG_DATA);
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([]);

  private destroy$ = new Subject<void>();
  private readonly transactionsService = inject(TransactionsService);
  toastrService = inject(ToastrService);
  constructor() {
    if (this.data.Transaction.length === 0) {
      this.getTransactionHistory(this.data.TransactionId);
    }
    this.dataSource.data = this.data.Transaction.sort((a, b) => b.StageId - a.StageId);
    this.toastrService.success('Transaction history fetched successfully', 'Success');
  }

  getTransactionHistory(transactionId: string): void {
    this.loading = true;
    this.transactionsService.getTransactionHistory(transactionId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (transactions: Transaction[]) => {
        this.dataSource.data = transactions.sort((a, b) => b.StageId - a.StageId);
        this.loading = false;
        this.toastrService.success('Transaction history fetched successfully', 'Success');
      },
      error: (error) => {
        console.error('Error fetching transaction history:', error);
        this.loading = false;
        this.toastrService.error('Failed to fetch transaction history', 'Error');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
