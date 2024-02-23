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
exports.AnnouncersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const announcers_service_1 = require("./announcers.service");
const create_announcer_dto_1 = require("./dto/create-announcer.dto");
const update_announcer_dto_1 = require("./dto/update-announcer.dto");
const announcers_schema_1 = require("./announcers.schema");
let AnnouncersController = class AnnouncersController {
    constructor(announcersService) {
        this.announcersService = announcersService;
    }
    create(createAnnouncerDto) {
        return this.announcersService.create(createAnnouncerDto);
    }
    findAll() {
        return this.announcersService.findAll();
    }
    findOne(id) {
        return this.announcersService.findOne(id);
    }
    update(id, updateAnnouncerDto) {
        return this.announcersService.update(id, updateAnnouncerDto);
    }
    remove(id) {
        return this.announcersService.remove(id);
    }
};
exports.AnnouncersController = AnnouncersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Announcer' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Announcer created.' }),
    (0, swagger_1.ApiBody)({ type: announcers_schema_1.Announcer }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_announcer_dto_1.CreateAnnouncerDto]),
    __metadata("design:returntype", void 0)
], AnnouncersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Announcers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All announcers returned.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnnouncersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Announcer by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Announcer found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcer' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnnouncersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Announcer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Announcer updated.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcer to update' }),
    (0, swagger_1.ApiBody)({ type: announcers_schema_1.Announcer }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_announcer_dto_1.UpdateAnnouncerDto]),
    __metadata("design:returntype", void 0)
], AnnouncersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Announcer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Announcer deleted.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcer to delete' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnnouncersController.prototype, "remove", null);
exports.AnnouncersController = AnnouncersController = __decorate([
    (0, swagger_1.ApiTags)('announcers'),
    (0, common_1.Controller)('announcers'),
    __metadata("design:paramtypes", [announcers_service_1.AnnouncersService])
], AnnouncersController);
//# sourceMappingURL=announcers.controller.js.map