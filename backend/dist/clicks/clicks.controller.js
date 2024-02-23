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
exports.ClicksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clicks_service_1 = require("./clicks.service");
const create_click_dto_1 = require("./dto/create-click.dto");
const update_click_dto_1 = require("./dto/update-click.dto");
const count_click_request_dto_1 = require("./dto/count-click-request-dto");
const check_click_already_clicked_dto_1 = require("./dto/check-click-already-clicked-dto");
const clicks_schema_1 = require("./clicks.schema");
let ClicksController = class ClicksController {
    constructor(clicksService) {
        this.clicksService = clicksService;
    }
    findAll() {
        return this.clicksService.findAll();
    }
    findOne(id) {
        return this.clicksService.findOne(id);
    }
    create(createClickDto) {
        return this.clicksService.create(createClickDto);
    }
    async ipAlreadyClicked(checkIpAlreadyClicked) {
        return await this.clicksService.checkIfIpAlreadyClicked(checkIpAlreadyClicked.ip, checkIpAlreadyClicked.reference);
    }
    async hasAtLeastThousandUnpaidClicks(countClickRequestDto) {
        return await this.clicksService.hasAtLeastThousandUnpaidClicks(countClickRequestDto.reference);
    }
    async markAllClicksAsPaid() {
        return await this.clicksService.markAllClicksAsPaid();
    }
    update(id, updateClickDto) {
        return this.clicksService.update(id, updateClickDto);
    }
    remove(id) {
        return this.clicksService.remove(id);
    }
    countClicks(proposalId) {
        return this.clicksService.countClicksByProposalId(proposalId);
    }
};
exports.ClicksController = ClicksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all clicks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all clicks.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClicksController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find a click by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single click.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the click to find' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClicksController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new click' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The click has been created.' }),
    (0, swagger_1.ApiBody)({ type: clicks_schema_1.Click, description: 'Data for creating a click' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_click_dto_1.CreateLinkDto]),
    __metadata("design:returntype", void 0)
], ClicksController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if an IP has already clicked' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns whether the IP has already clicked.',
    }),
    (0, swagger_1.ApiBody)({
        type: check_click_already_clicked_dto_1.CheckIpAlreadyClicked,
        description: 'IP and reference to check',
    }),
    (0, common_1.Post)('/ip-already-clicked'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_click_already_clicked_dto_1.CheckIpAlreadyClicked]),
    __metadata("design:returntype", Promise)
], ClicksController.prototype, "ipAlreadyClicked", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Check if there are at least a thousand unpaid clicks',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns true if there are at least a thousand unpaid clicks.',
    }),
    (0, swagger_1.ApiBody)({
        type: count_click_request_dto_1.CountClickRequestDto,
        description: 'Reference to check for unpaid clicks',
    }),
    (0, common_1.Post)('/unpaid'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [count_click_request_dto_1.CountClickRequestDto]),
    __metadata("design:returntype", Promise)
], ClicksController.prototype, "hasAtLeastThousandUnpaidClicks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark all clicks as paid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Marks all clicks as paid.' }),
    (0, common_1.Patch)('/reset-unpaid-count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClicksController.prototype, "markAllClicksAsPaid", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a click' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The click has been updated.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the click to update' }),
    (0, swagger_1.ApiBody)({ type: clicks_schema_1.Click, description: 'Data for updating a click' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_click_dto_1.UpdateLinkDto]),
    __metadata("design:returntype", void 0)
], ClicksController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a click' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The click has been deleted.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the click to delete' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClicksController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get click count by proposalId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return click count.' }),
    (0, common_1.Get)('/count/:proposalId'),
    __param(0, (0, common_1.Param)('proposalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClicksController.prototype, "countClicks", null);
exports.ClicksController = ClicksController = __decorate([
    (0, swagger_1.ApiTags)('clicks'),
    (0, common_1.Controller)('clicks'),
    __metadata("design:paramtypes", [clicks_service_1.ClicksService])
], ClicksController);
//# sourceMappingURL=clicks.controller.js.map