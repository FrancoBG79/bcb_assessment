import { Controller, Get, Param, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) {}
    @Get()
    findAll(){
        return this.transactionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsService.findOne(id);
    }

    @Put(':id')
    nextStage(@Param('id') id: string) {
        return this.transactionsService.nextStage(id);
    }
}
