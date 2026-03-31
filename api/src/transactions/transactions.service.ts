import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsDto } from './dto/transactions.dto';
import { join, resolve } from 'path';
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { TransactionsList } from './dto/transactionsList.dto';

@Injectable()
export class TransactionsService {
    
    constructor() {
        this.populateDummyData();
    };

    transactionsList: TransactionsList[] = []

    stages = [
        { StageId: 0, StageName: 'Initiated' },
        { StageId: 1, StageName: 'InMemPool' },
        { StageId: 2, StageName: 'Processing' },
        { StageId: 3, StageName: 'InCompliance' },
        { StageId: 4, StageName: 'Complete' },
    ]

    getStageID(stageName: string) {
        const stage = this.stages.find(s => s.StageName === stageName);
        return stage!.StageId ;
    }


    async readCsvFile(): Promise<TransactionsDto[]> {
        const results: any[] = [];
        const filePath = join(process.cwd(), 'data.csv');
        return new Promise((resolve, reject) => {
            createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                })
                .on('error', (err) => {
                    console.error('Error loading dummy data:', err);
                    reject(err);
                });
        });
    }
    
    async populateDummyData() {
        const getCsvData = await this.readCsvFile();
        return this.transactionsList = getCsvData.map((item) => {
            return{
                TransactionId: item.TransactionId,
                Transaction: [{
                    TransactionId: item.TransactionId,
                    FromAddress: item.FromAddress,
                    ToAddress: item.ToAddress,
                    TokenName: item.TokenName,
                    Amount: item.Amount,
                    Status: item.Status,
                    StageId: this.getStageID(item.Status),
                    UpdateDate: new Date().toISOString()
                }]
            };
        });
    }

    
    async findAll() {
        if(this.transactionsList.length === 0) {
            await this.populateDummyData();
        }
        return this.transactionsList;
    }

    async findOne(id: string) {
        const transaction = this.transactionsList.find(transaction => transaction.TransactionId === id);
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        return transaction;
    }

    async nextStage(id: string) {
        const transaction = this.transactionsList.find(transaction => transaction.TransactionId === id);
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        const lastStage = transaction.Transaction.sort((a, b) => b.StageId - a.StageId)[0];
        const lastStageId = lastStage.StageId;
        
        if (lastStageId >= 4) {
            throw new NotFoundException('Transaction already at final stage');
        }
        
        const nextStageId = lastStageId + 1;
        const nextStageName = this.stages.find(s => s.StageId === nextStageId)!.StageName;
        
        transaction.Transaction.push({
            TransactionId: transaction.TransactionId,
            FromAddress: lastStage.FromAddress,
            ToAddress: lastStage.ToAddress,
            TokenName: lastStage.TokenName,
            Amount: lastStage.Amount,
            Status: nextStageName,
            StageId: nextStageId,
            UpdateDate: new Date().toISOString()
        });
        
        return transaction;
    }

}
