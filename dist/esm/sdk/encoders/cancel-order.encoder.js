"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeCancelOrder = encodeCancelOrder;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const assert_1 = tslib_1.__importDefault(require("assert"));
const AggregationRouterV6_abi_json_1 = tslib_1.__importDefault(require("../../abi/AggregationRouterV6.abi.json"));
const validations_1 = require("../../validations");
const lopAbi = new ethers_1.Interface(AggregationRouterV6_abi_json_1.default);
function encodeCancelOrder(hash, makerTraits) {
    (0, assert_1.default)((0, validations_1.isHexBytes)(hash), 'Invalid order hash');
    return lopAbi.encodeFunctionData('cancelOrder', [
        makerTraits.asBigInt(),
        hash
    ]);
}
//# sourceMappingURL=cancel-order.encoder.js.map