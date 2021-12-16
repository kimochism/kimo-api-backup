const { PAID_MARKET_TEST_ACCESS_TOKEN } = process.env;
import { configurations, payment } from 'mercadopago';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';
export class PaidMarketService {
    
    constructor() {
        configurations.setAccessToken(PAID_MARKET_TEST_ACCESS_TOKEN);
    }

    async savePayment(paymentData: CreatePaymentPayload) {
        return await payment.save(paymentData);
    }
}