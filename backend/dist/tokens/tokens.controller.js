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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tokens_service_1 = require("./tokens.service");
const create_token_dto_1 = require("./dto/create-token.dto");
const update_token_dto_1 = require("./dto/update-token.dto");
const tokens_schema_1 = require("./tokens.schema");
let TokensController = class TokensController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    create(createTokenDto) {
        return this.tokenService.create(createTokenDto);
    }
    findAll() {
        return this.tokenService.findAll();
    }
    findOne(id) {
        return this.tokenService.findOne(id);
    }
    update(id, updateTokenDto) {
        return this.tokenService.update(id, updateTokenDto);
    }
    remove(id) {
        return this.tokenService.remove(id);
    }
};
exports.TokensController = TokensController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Token' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Token created.' }),
    (0, swagger_1.ApiBody)({ type: tokens_schema_1.Token }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Tokens' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All tokens returned.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Token by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the token' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token updated.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the token to update' }),
    (0, swagger_1.ApiBody)({ type: tokens_schema_1.Token }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_token_dto_1.UpdateTokenDto]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token deleted.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the token to delete' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "remove", null);
exports.TokensController = TokensController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('tokens'),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], TokensController);
//# sourceMappingURL=tokens.controller.js.map