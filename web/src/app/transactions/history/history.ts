import { Component, inject } from '@angular/core';
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

import { Transaction } from '../../services/transactions.service';;

@Component({
  selector: 'app-history',
  imports: [
    DatePipe,
    MatDialogTitle,
    MatDialogContent,
    MatTableModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class HistoryDialog {
  displayedColumns: string[] = ['id', 'status', 'updateDate'];
  
  data: Transaction[] = inject(MAT_DIALOG_DATA);
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([]);
  constructor() {
    this.dataSource.data = this.data.sort((a, b) => b.StageId - a.StageId);
  }
}
