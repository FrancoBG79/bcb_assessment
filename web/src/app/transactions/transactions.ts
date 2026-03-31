import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Subject, takeUntil } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { Transaction, TransactionsList, TransactionsService } from '../services/transactions.service';
import { HistoryDialog } from './history/history';
import { StepperDialog } from './stepper/stepper';

@Component({
  selector: 'app-transactions',
  imports: [
    MatToolbarModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatProgressSpinnerModule,
    DatePipe,
    MatButtonModule
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Transactions implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'amount', 'status', 'updateDate', 'history', 'step'];
  dataSource: MatTableDataSource<TransactionsList> = new MatTableDataSource<TransactionsList>([]);
  private destroy$ = new Subject<void>();
  private readonly transactionsService = inject(TransactionsService);
  private readonly cdr = inject(ChangeDetectorRef);
  dialog = inject(MatDialog);
  toastrService = inject(ToastrService);
  constructor() {
    this.getAllTransactions();
  }
 

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getAllTransactions() {
    this.loading = true;
    this.transactionsService.getAllTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.loading = false;
          this.toastrService.success('Transactions fetched successfully', 'Success');
          this.cdr.markForCheck();
        },
        error: (error: Error) => {
          this.loading = false;
          this.cdr.markForCheck();
          const errorMessage = error?.message || 'Error fetching transactions';
          this.toastrService.error(errorMessage, 'Error');
          console.error('Error fetching transactions:', error);
        },
        complete: () => {
          this.loading = false;
          this.cdr.markForCheck();
        }
    });
  }

  getLatestTransactionStage(transaction: TransactionsList): Transaction {
    const lastStage = transaction.Transaction.sort((a, b) => b.StageId - a.StageId)[0];
    return lastStage;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openHistoryDialog(transaction: TransactionsList) {
    this.dialog.open(HistoryDialog, {
      data: transaction.Transaction,
      width: '800px',
      height: '600px'
    });
  }

  openStepDialog(transaction: TransactionsList) {
    this.dialog.open(StepperDialog, {
      data: transaction.Transaction.sort((a, b) => b.StageId - a.StageId)[0],
      width: '600px',
      height: '300px'
    }).afterClosed().subscribe(() => {
      this.getAllTransactions();
      this.cdr.detectChanges();
    });
  }

   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}