const { TEST_ACCESS_TOKEN } = process.env;
import { configure, preferences } from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';

export class PaidMarketService {
    constructor() {
        configure({ access_token: TEST_ACCESS_TOKEN })
    }
    
    async createPreference(preference: CreatePreferencePayload) {
        const response = await preferences.create(preference);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        global.id = response.body.id;
        
        return response;
    }
}