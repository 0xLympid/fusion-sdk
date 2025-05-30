"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionApi = void 0;
const quoter_1 = require("./quoter");
const relayer_1 = require("./relayer");
const orders_1 = require("./orders");
const ordersVersion_1 = require("./ordersVersion");
const connector_1 = require("../connector");
class FusionApi {
    constructor(config) {
        this.quoterApi = quoter_1.QuoterApi.new({
            url: `${config.url}/quoter`,
            network: config.network,
            authKey: config.authKey
        }, config.httpProvider);
        this.relayerApi = relayer_1.RelayerApi.new({
            url: `${config.url}/relayer`,
            network: config.network,
            authKey: config.authKey
        }, config.httpProvider);
        this.ordersApi = orders_1.OrdersApi.new({
            url: `${config.url}/orders`,
            network: config.network,
            authKey: config.authKey
        }, config.httpProvider);
    }
    static new(config) {
        return new FusionApi({
            network: config.network,
            url: config.url,
            authKey: config.authKey,
            httpProvider: config.httpProvider ||
                new connector_1.AxiosProviderConnector(config.authKey)
        });
    }
    getQuote(params) {
        return this.quoterApi.getQuote(params);
    }
    getQuoteWithCustomPreset(params, body) {
        return this.quoterApi.getQuoteWithCustomPreset(params, body);
    }
    getActiveOrders(params = orders_1.ActiveOrdersRequest.new(), ordersVersion = ordersVersion_1.OrdersVersion._2_1) {
        return this.ordersApi.getActiveOrders(params, ordersVersion);
    }
    getOrderStatus(params) {
        return this.ordersApi.getOrderStatus(params);
    }
    getOrdersByMaker(params, ordersVersion = ordersVersion_1.OrdersVersion._2_1) {
        return this.ordersApi.getOrdersByMaker(params, ordersVersion);
    }
    submitOrder(params) {
        return this.relayerApi.submit(params);
    }
    submitOrderBatch(params) {
        return this.relayerApi.submitBatch(params);
    }
}
exports.FusionApi = FusionApi;
//# sourceMappingURL=fusion-api.js.map