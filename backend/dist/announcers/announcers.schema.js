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
exports.AnnouncerSchema = exports.Announcer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Announcer = class Announcer {
};
exports.Announcer = Announcer;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Announcer.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Razão Social', example: 'XYZ Corp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcer.prototype, "razaoSocial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantidade de Anúncios Feitos', example: 100 }),
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Announcer.prototype, "quantidadeAnunciosFeitos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Stars rating', example: 4.5, type: 'number' }),
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.Decimal128 }),
    __metadata("design:type", Number)
], Announcer.prototype, "stars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Link to announcer profile',
        example: 'https://example.com/announcer',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcer.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the announcer',
        example: 'announcer@example.com',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcer.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Wallet address of the announcer',
        example: '0xABC123...',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Announcer.prototype, "walletAddress", void 0);
exports.Announcer = Announcer = __decorate([
    (0, mongoose_1.Schema)()
], Announcer);
exports.AnnouncerSchema = mongoose_1.SchemaFactory.createForClass(Announcer);
//# sourceMappingURL=announcers.schema.js.map