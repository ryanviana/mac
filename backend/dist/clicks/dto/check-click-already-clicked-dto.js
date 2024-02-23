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
exports.CheckIpAlreadyClicked = void 0;
const swagger_1 = require("@nestjs/swagger");
class CheckIpAlreadyClicked {
}
exports.CheckIpAlreadyClicked = CheckIpAlreadyClicked;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IP address of the user',
        example: '192.168.1.1',
    }),
    __metadata("design:type", String)
], CheckIpAlreadyClicked.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference identifier to check against the IP',
        example: '/test',
    }),
    __metadata("design:type", String)
], CheckIpAlreadyClicked.prototype, "reference", void 0);
//# sourceMappingURL=check-click-already-clicked-dto.js.map