import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

export interface TransactionsList {
  TransactionId: string;
  Transaction: Transaction[];
}

export interface Transaction {
  TransactionId: string;
  FromAddress: string;
  ToAddress: string;
  TokenName: string;
  Amount: number;
  Status: string;
  StageId: number;
  UpdateDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {

  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  getAllTransactions(): Observable<TransactionsList[]> {
    return this.httpClient.get<TransactionsList[]>(`${this.apiUrl}/transactions`,
      { observe: 'response' }
    )
    .pipe(
      map((response: HttpResponse<TransactionsList[]>) => {
        return response.body ?? [];
      }),
      catchError((error: HttpErrorResponse) =>  { throw new Error(error.message); }),
    );
  }

  getTransactionHistory(transactionId: string): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`${this.apiUrl}/transactions/${transactionId}`,
      { observe: 'response' }
    )
    .pipe(
      map((response: HttpResponse<Transaction[]>) => {
        return response.body ?? [];
      }),
      catchError((error: HttpErrorResponse) =>  { throw new Error(error.message); }),
    );
  }

  updateStage(transactionId: string): Observable<Transaction> {
    return this.httpClient.put<Transaction>(`${this.apiUrl}/transactions/${transactionId}`,
      {},
      { observe: 'response' }
    )
    .pipe(
      map((response: HttpResponse<Transaction>) => {
        return response.body as Transaction;
      }),
      catchError((error: HttpErrorResponse) =>  { throw new Error(error.message); }),
    );
  }
}
