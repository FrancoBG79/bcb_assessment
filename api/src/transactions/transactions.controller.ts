import { Controller, Get, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsListResponseDto,  } from './dto/transactions-response.dto';
import { TransactionResponseDto } from './dto/transactions-response.dto';

@Controller('transactions')
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    async findAll(): Promise<TransactionsListResponseDto[]> {
        try {
            return await this.transactionsService.findAll();
        } catch (error) {
            throw new HttpException('Failed to fetch transactions', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<TransactionResponseDto[]> {
        try {
            return await this.transactionsService.findOne(id);
        } catch (error) {
            throw new HttpException('Failed to fetch transaction', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async nextStage(@Param('id') id: string): Promise<TransactionsListResponseDto> {
        try {
            return await this.transactionsService.nextStage(id);
        } catch (error) {
            throw new HttpException('Failed to update transaction stage', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
