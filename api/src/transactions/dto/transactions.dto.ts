import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class TransactionsDto {
  @IsString()
  @IsNotEmpty()
  TransactionId: string;

  @IsString()
  @IsNotEmpty()
  FromAddress: string;

  @IsString()
  @IsNotEmpty()
  ToAddress: string;

  @IsString()
  @IsNotEmpty()
  TokenName: string;

  @IsNumber()
  Amount: number;

  @IsString()
  @IsNotEmpty()
  Status: string;
}