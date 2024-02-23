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
exports.ReferenceSchema = exports.Reference = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Reference = class Reference {
};
exports.Reference = Reference;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Reference.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Announcement identifier',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Reference.prototype, "announcementId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Link associated with the reference',
        example: 'https://example.com',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Reference.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference identifier',
        example: '/reference123',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Reference.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Is the reference active?',
        example: 'true',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Reference.prototype, "active", void 0);
exports.Reference = Reference = __decorate([
    (0, mongoose_1.Schema)()
], Reference);
exports.ReferenceSchema = mongoose_1.SchemaFactory.createForClass(Reference);
//# sourceMappingURL=references.schema.js.map