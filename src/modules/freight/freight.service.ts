import { Injectable } from "@nestjs/common";
import { BaseService } from '../../utils/baseService';
const { CORREIOS_FRETE_URL } = process.env;
import { calcularPrecoPrazo, PrecoPrazoRequest } from 'correios-brasil';

@Injectable()
export class FreightService extends BaseService {
    constructor() { 
        super(CORREIOS_FRETE_URL);
    }

    async calcPriceAndDelivery(data: PrecoPrazoRequest) {
        const response = await  calcularPrecoPrazo(data);

        return response;
    }
}