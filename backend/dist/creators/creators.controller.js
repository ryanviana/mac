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
exports.CreatorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const creators_service_1 = require("./creators.service");
const create_creator_dto_1 = require("./dto/create-creator.dto");
const update_creator_dto_1 = require("./dto/update-creator.dto");
const creators_schema_1 = require("./creators.schema");
let CreatorsController = class CreatorsController {
    constructor(creatorsService) {
        this.creatorsService = creatorsService;
    }
    create(createCreatorDto) {
        return this.creatorsService.create(createCreatorDto);
    }
    findAll() {
        return this.creatorsService.findAll();
    }
    findOne(id) {
        return this.creatorsService.findOne(id);
    }
    update(id, updateCreatorDto) {
        return this.creatorsService.update(id, updateCreatorDto);
    }
    remove(id) {
        return this.creatorsService.remove(id);
    }
};
exports.CreatorsController = CreatorsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new creator' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The creator has been successfully created.',
    }),
    (0, swagger_1.ApiBody)({
        type: creators_schema_1.Creator,
        description: 'Data for creating a new creator',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_creator_dto_1.CreateCreatorDto]),
    __metadata("design:returntype", void 0)
], CreatorsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all creators' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns an array of creators.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CreatorsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find a creator by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a single creator.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the creator to find' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreatorsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a creator' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The creator has been successfully updated.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the creator to update' }),
    (0, swagger_1.ApiBody)({
        type: creators_schema_1.Creator,
        description: 'Data for updating a creator',
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_creator_dto_1.UpdateCreatorDto]),
    __metadata("design:returntype", void 0)
], CreatorsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a creator' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The creator has been successfully deleted.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the creator to delete' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreatorsController.prototype, "remove", null);
exports.CreatorsController = CreatorsController = __decorate([
    (0, swagger_1.ApiTags)('creators'),
    (0, common_1.Controller)('creators'),
    __metadata("design:paramtypes", [creators_service_1.CreatorsService])
], CreatorsController);
//# sourceMappingURL=creators.controller.js.map