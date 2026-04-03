import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionResponseDto {
  @IsString()
  TransactionId: string;

  @IsString()
  FromAddress: string;

  @IsString()
  ToAddress: string;

  @IsString()
  TokenName: string;

  Amount: number;

  @IsString()
  Status: string;

  StageId: number;

  @IsString()
  UpdateDate: string;
}

export class TransactionsListResponseDto {
  @IsString()
  TransactionId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionResponseDto)
  Transaction: TransactionResponseDto[];
}