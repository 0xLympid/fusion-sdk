"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectTrackCode = injectTrackCode;
const byte_utils_1 = require("@1inch/byte-utils");
const ethers_1 = require("ethers");
const utils_1 = require("../utils");
const validations_1 = require("../validations");
const TRACK_CODE_MASK = new byte_utils_1.BitMask(224n, 256n);
function getTrackCodeForSource(source) {
    if (!(0, validations_1.isHexString)(source)) {
        return createId(source);
    }
    if (source.length === 10) {
        return BigInt(source);
    }
    if (source.length === 66) {
        return BigInt(source.substring(0, 10));
    }
    return createId(source);
}
function createId(source) {
    return BigInt((0, utils_1.add0x)((0, ethers_1.id)(source).slice(0, 10)));
}
function injectTrackCode(salt, source) {
    const track = source ? getTrackCodeForSource(source) : 0n;
    return new byte_utils_1.BN(salt).setMask(TRACK_CODE_MASK, track).value;
}
//# sourceMappingURL=source-track.js.map