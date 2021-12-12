import { Body, Controller, Post } from '@nestjs/common';
import { PrecoPrazoRequest } from 'correios-brasil/dist';
import { FreightService } from './freight.service';

@Controller('freights')
export class FreightController {
    constructor(
        private readonly freightService: FreightService,
    ) {}
    
    @Post()
    async calculateFreight(@Body() data: PrecoPrazoRequest) {

        const correiosResponse = await this.freightService.calcPriceAndDelivery(data);

        return correiosResponse;
    }
}