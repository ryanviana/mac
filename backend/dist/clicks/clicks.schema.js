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
exports.ClickSchema = exports.Click = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Click = class Click {
};
exports.Click = Click;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Click.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reference', example: '/reference123' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Click.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP Address', example: '192.168.1.1' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Click.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Paid status', example: false }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Click.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payment token', example: 'BTC' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Click.prototype, "paymentToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Proposal ID', example: '123' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Click.prototype, "proposalId", void 0);
exports.Click = Click = __decorate([
    (0, mongoose_1.Schema)()
], Click);
exports.ClickSchema = mongoose_1.SchemaFactory.createForClass(Click);
//# sourceMappingURL=clicks.schema.js.map