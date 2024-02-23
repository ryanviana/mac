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
exports.AnnouncementSchema = exports.Announcement = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Announcement = class Announcement {
};
exports.Announcement = Announcement;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Announcement.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the announcement',
        example: 'New product launch',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique token', example: '12345' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cost per thousand impressions',
        example: 20.5,
        type: 'number',
    }),
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.Decimal128 }),
    __metadata("design:type", Number)
], Announcement.prototype, "CPM", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Advertiser', example: 'Advertiser Inc.' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "anunciante", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content creator', example: 'Creator X' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "criadorConteudo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the announcement', example: 'Active' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Completion status', example: false }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Announcement.prototype, "concluido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parameterized link',
        example: 'https://example.com?ref=123',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "linkParametrizado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Proposal Id', example: 'SN123456' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Announcement.prototype, "proposalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount to be paid',
        example: 200.5,
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Announcement.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Wallet Address of the Advertiser',
        example: '0x1234567890',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "advertiserWalletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Wallet Address of the Content Creator',
        example: '0x1234567890',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcement.prototype, "creatorWalletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clicks milestone to be completed. Each clicks milestone the creator is paid.',
        example: 1000,
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Announcement.prototype, "milestone", void 0);
exports.Announcement = Announcement = __decorate([
    (0, mongoose_1.Schema)()
], Announcement);
exports.AnnouncementSchema = mongoose_1.SchemaFactory.createForClass(Announcement);
//# sourceMappingURL=announcements.schema.js.map