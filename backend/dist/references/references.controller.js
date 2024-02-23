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
exports.ReferencesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const references_service_1 = require("./references.service");
const create_reference_dto_1 = require("./dto/create-reference.dto");
const update_reference_dto_1 = require("./dto/update-reference.dto");
const check_link_by_reference_dto_1 = require("./dto/check-link-by-reference.dto");
const references_schema_1 = require("./references.schema");
let ReferencesController = class ReferencesController {
    constructor(referenceService) {
        this.referenceService = referenceService;
    }
    create(createReferenceDto) {
        return this.referenceService.create(createReferenceDto);
    }
    findAll() {
        return this.referenceService.findAll();
    }
    getLinkByReference(checkLinkByReferenceDto) {
        return this.referenceService.getLinkByReference(checkLinkByReferenceDto.reference);
    }
    findOne(id) {
        return this.referenceService.findOne(id);
    }
    update(id, updateReferenceDto) {
        return this.referenceService.update(id, updateReferenceDto);
    }
    remove(id) {
        return this.referenceService.remove(id);
    }
    getActiveReferences() {
        return this.referenceService.getActiveReferences();
    }
    checkReferenceExists(reference) {
        return this.referenceService.checkReferenceExists(reference);
    }
    getIdByReference(reference) {
        return this.referenceService.getReferenceByReference(reference);
    }
};
exports.ReferencesController = ReferencesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Reference' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Reference created.' }),
    (0, swagger_1.ApiBody)({ type: references_schema_1.Reference }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reference_dto_1.CreateReferenceDto]),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All References' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All references returned.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Link by Reference' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Link returned for given reference.',
    }),
    (0, swagger_1.ApiBody)({ type: check_link_by_reference_dto_1.CheckLinkByReferenceDto }),
    (0, common_1.Post)('/get-link-by-reference'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_link_by_reference_dto_1.CheckLinkByReferenceDto]),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "getLinkByReference", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Reference by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reference found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the reference' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Reference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reference updated.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the reference to update' }),
    (0, swagger_1.ApiBody)({ type: references_schema_1.Reference }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reference_dto_1.UpdateReferenceDto]),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Reference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reference deleted.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the reference to delete' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Active References' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All active references returned.' }),
    (0, common_1.Get)('/active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "getActiveReferences", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if Reference Exists' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reference exists.' }),
    (0, swagger_1.ApiParam)({ name: 'reference', description: 'Reference to check' }),
    (0, common_1.Get)('/check-reference-exists/:reference'),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "checkReferenceExists", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get ID by Reference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'ID returned for given reference.' }),
    (0, swagger_1.ApiParam)({ name: 'reference', description: 'Reference to get ID for' }),
    (0, common_1.Get)('/get-id-by-reference/:reference'),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReferencesController.prototype, "getIdByReference", null);
exports.ReferencesController = ReferencesController = __decorate([
    (0, swagger_1.ApiTags)('references'),
    (0, common_1.Controller)('references'),
    __metadata("design:paramtypes", [references_service_1.ReferencesService])
], ReferencesController);
//# sourceMappingURL=references.controller.js.map