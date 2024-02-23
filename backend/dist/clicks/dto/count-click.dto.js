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
exports.UnpaidClicksResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UnpaidClicksResponseDto {
}
exports.UnpaidClicksResponseDto = UnpaidClicksResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if there are at least a thousand unpaid clicks',
        example: true,
    }),
    __metadata("design:type", Boolean)
], UnpaidClicksResponseDto.prototype, "hasAtLeastThousandUnpaidClicks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The count of unpaid clicks',
        example: 1020,
        required: false,
    }),
    __metadata("design:type", Number)
], UnpaidClicksResponseDto.prototype, "unpaidClicksCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional message, if any',
        example: 'Threshold of 1000 unpaid clicks exceeded',
        required: false,
    }),
    __metadata("design:type", String)
], UnpaidClicksResponseDto.prototype, "message", void 0);
//# sourceMappingURL=count-click.dto.js.map