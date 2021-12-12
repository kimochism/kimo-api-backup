import axios from 'axios';

export class BaseService {
    apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async post(serviceUrl: string, data: any, paramsValues = null, queryValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues, queryValues);
        const headers = this.prepareHeader();

        try {
            const response = await axios.post(endpoint, data, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async get(serviceUrl: string, paramsValues = null, queryValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues, queryValues);

        console.log(endpoint);
        
        const headers = this.prepareHeader();

        try {
            const response = await axios.get(endpoint, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async put(serviceUrl: string, data: any, paramsValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues);
        const headers = this.prepareHeader();

        try {
            const response = await axios.put(endpoint, data, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async patch(serviceUrl: string, data: any, paramsValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl);
        const headers = this.prepareHeader();

        try {
            const response = await axios.patch(endpoint, data, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async delete(serviceUrl: string, paramsValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues);
        const headers = this.prepareHeader();

        try {
            const response = await axios.delete(endpoint, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    /**
     * Prepara o header que será enviado
     *
     * @param {object} headers
    */
    prepareHeader(headers?: any) {
        const buildedHeaders = {
            'Content-Type': 'application/json'
        };

        return { headers: buildedHeaders };
    }

    /**
     * Prepara o endpoint da requisição
     *
     * @param {Enum} serviceUrl
     * @param {[string]} paramsValues
     * @param {object} queryValues
    */
    prepareEndpoint(serviceUrl: string, paramsValues = null, queryValues = null) {
        const path = this.buildPathParams(serviceUrl, paramsValues);

        const queries = this.buildQueryParams(queryValues) || '';

        const endpoint = this.apiUrl.concat(path).concat(queries);
        return encodeURI(endpoint);
    }

    /**
     * Prepara os path params a serem enviados
     *
     * @param {Enum} serviceUrl
     * @param {[string]} paramsValues
    */
    buildPathParams(serviceUrl: string, paramsValues: { [x: string]: any; }) {
        let path = serviceUrl;
        const paramKeys = path.match(/\{.*?\}/g) || [];

        if (!paramKeys && !paramsValues) {
            return path;
        }

        for (const key in paramsValues) {
            path = path.replace(paramKeys[key], paramsValues[key]);
        }
        return path.replace(/ /g, '');
    }

    /**
     * Prepara os query params a serem enviados
     *
     * @param {object} query
    */
    buildQueryParams(query: { [x: string]: string; }) {
        if (!query) { return; }

        const buildedQuery = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        return '?'.concat(buildedQuery);
    }
}
