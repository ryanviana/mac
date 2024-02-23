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
exports.CreatorSchema = exports.Creator = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Creator = class Creator {
};
exports.Creator = Creator;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Creator.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the creator', example: 'John Doe' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Biography of the creator',
        example: 'John is a content creator...',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Occupation of the creator', example: 'Blogger' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "occupation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Target audience of the creator',
        example: 'Tech enthusiasts',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Stars rating', example: 4.5, type: 'number' }),
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.Decimal128 }),
    __metadata("design:type", Number)
], Creator.prototype, "stars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Link to creator profile',
        example: 'https://example.com/creator',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the creator',
        example: 'creator@example.com',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cost per thousand impressions (CPM)',
        example: 15.5,
        type: 'number',
    }),
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.Decimal128 }),
    __metadata("design:type", Number)
], Creator.prototype, "CPM", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Wallet address of the creator',
        example: '0xABC123...',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment token of the creator',
        example: 'BTC',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Creator.prototype, "paymentToken", void 0);
exports.Creator = Creator = __decorate([
    (0, mongoose_1.Schema)()
], Creator);
exports.CreatorSchema = mongoose_1.SchemaFactory.createForClass(Creator);
//# sourceMappingURL=creators.schema.js.map