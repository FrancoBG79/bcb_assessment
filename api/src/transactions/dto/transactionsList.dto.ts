export class TransactionsList {
    TransactionId: string;
    Transaction: {
        TransactionId: string;
        FromAddress: string;
        ToAddress: string;
        TokenName: string;
        Amount: number;
        Status: string;
        StageId: number;
        UpdateDate: string;
    }[];
	
}