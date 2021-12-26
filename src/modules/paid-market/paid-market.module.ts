import { Module } from '@nestjs/common';
import { PaidMarketService } from './paid-market.service';

@Module({
    providers: [PaidMarketService],
    exports: [PaidMarketService],
})

export class PaidMarketModule {}