"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersApi = void 0;
const connector_1 = require("../../connector");
const params_1 = require("../params");
class OrdersApi {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
    }
    static new(config, httpClient = new connector_1.AxiosProviderConnector(config.authKey)) {
        return new OrdersApi(config, httpClient);
    }
    async getActiveOrders(params, ordersVersion) {
        const err = params.validate();
        if (err) {
            throw new Error(err);
        }
        const queryParams = (0, params_1.concatQueryParams)(params.build(), ordersVersion);
        const url = `${this.config.url}/${OrdersApi.Version}/${this.config.network}/order/active/${queryParams}`;
        return this.httpClient.get(url);
    }
    async getOrderStatus(params) {
        const err = params.validate();
        if (err) {
            throw new Error(err);
        }
        const url = `${this.config.url}/${OrdersApi.Version}/${this.config.network}/order/status/${params.orderHash}`;
        return this.httpClient.get(url);
    }
    async getOrdersByMaker(params, ordersVersion) {
        const err = params.validate();
        if (err) {
            throw new Error(err);
        }
        const qp = (0, params_1.concatQueryParams)(params.buildQueryParams(), ordersVersion);
        const url = `${this.config.url}/${OrdersApi.Version}/${this.config.network}/order/maker/${params.address}/${qp}`;
        return this.httpClient.get(url);
    }
}
exports.OrdersApi = OrdersApi;
OrdersApi.Version = 'v2.0';
//# sourceMappingURL=orders.api.js.map