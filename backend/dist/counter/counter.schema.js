"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterSchema = exports.Counter = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Counter = class Counter {
};
exports.Counter = Counter;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Counter.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'seq of the counter', example: '1000' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Counter.prototype, "seq", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'name of the counter',
        example: 'blockchainAdsId',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Counter.prototype, "name", void 0);
exports.Counter = Counter = __decorate([
    (0, mongoose_1.Schema)()
], Counter);
exports.CounterSchema = mongoose_1.SchemaFactory.createForClass(Counter);
//# sourceMappingURL=counter.schema.js.map