import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

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

export interface ApiError {
  message: string;
  status: number;
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
      catchError(this.handleError),
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
      catchError(this.handleError),
    );
  }

  updateStage(transactionId: string): Observable<TransactionsList> {
    return this.httpClient.put<TransactionsList>(`${this.apiUrl}/transactions/${transactionId}`,
      {},
      { observe: 'response' }
    )
    .pipe(
      map((response: HttpResponse<TransactionsList>) => {
        return response.body as TransactionsList;
      }),
      catchError(this.handleError),
    );
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else {
        errorMessage = `Server error: ${error.status} - ${error.message}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => ({ message: errorMessage, status: error.status }));
  };
}
