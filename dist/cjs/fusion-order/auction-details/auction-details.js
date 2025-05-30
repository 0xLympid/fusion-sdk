"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionDetails = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const byte_utils_1 = require("@1inch/byte-utils");
const assert_1 = tslib_1.__importDefault(require("assert"));
const validations_1 = require("../../validations");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
class AuctionDetails {
    constructor(auction) {
        this.startTime = BigInt(auction.startTime);
        this.initialRateBump = BigInt(auction.initialRateBump);
        this.duration = auction.duration;
        this.points = auction.points;
        this.gasCost = auction.gasCost || {
            gasBumpEstimate: 0n,
            gasPriceEstimate: 0n
        };
        (0, assert_1.default)(this.gasCost.gasBumpEstimate <= constants_1.UINT_24_MAX);
        (0, assert_1.default)(this.gasCost.gasPriceEstimate <= constants_1.UINT_32_MAX);
        (0, assert_1.default)(this.startTime <= constants_1.UINT_32_MAX);
        (0, assert_1.default)(this.duration <= constants_1.UINT_24_MAX);
        (0, assert_1.default)(this.initialRateBump <= constants_1.UINT_24_MAX);
    }
    static decodeFrom(iter) {
        const gasBumpEstimate = iter.nextUint24();
        const gasPriceEstimate = iter.nextUint32();
        const start = iter.nextUint32();
        const duration = iter.nextUint24();
        const rateBump = Number(iter.nextUint24());
        const points = [];
        let pointsLen = BigInt(iter.nextUint8());
        while (pointsLen--) {
            points.push({
                coefficient: Number(iter.nextUint24()),
                delay: Number(iter.nextUint16())
            });
        }
        return new AuctionDetails({
            startTime: BigInt(start),
            duration: BigInt(duration),
            initialRateBump: rateBump,
            points,
            gasCost: {
                gasBumpEstimate: BigInt(gasBumpEstimate),
                gasPriceEstimate: BigInt(gasPriceEstimate)
            }
        });
    }
    static decode(data) {
        (0, assert_1.default)((0, validations_1.isHexBytes)(data), 'Invalid auction details data');
        const iter = byte_utils_1.BytesIter.BigInt(data);
        return AuctionDetails.decodeFrom(iter);
    }
    static fromExtension(extension) {
        return AuctionDetails.decode((0, utils_1.add0x)(extension.makingAmountData.slice(42)));
    }
    encode() {
        let details = ethers_1.ethers.solidityPacked(['uint24', 'uint32', 'uint32', 'uint24', 'uint24', 'uint8'], [
            this.gasCost.gasBumpEstimate,
            this.gasCost.gasPriceEstimate,
            this.startTime,
            this.duration,
            this.initialRateBump,
            this.points.length
        ]);
        for (let i = 0; i < this.points.length; i++) {
            details += (0, utils_1.trim0x)(ethers_1.ethers.solidityPacked(['uint24', 'uint16'], [this.points[i].coefficient, this.points[i].delay]));
        }
        return details;
    }
    encodeInto(builder = new byte_utils_1.BytesBuilder()) {
        return builder.addBytes(this.encode());
    }
}
exports.AuctionDetails = AuctionDetails;
//# sourceMappingURL=auction-details.js.map