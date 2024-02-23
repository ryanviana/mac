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
exports.AnnouncementsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const announcements_service_1 = require("./announcements.service");
const create_announcement_dto_1 = require("./dto/create-announcement.dto");
const update_announcement_dto_1 = require("./dto/update-announcement.dto");
const announcements_schema_1 = require("./announcements.schema");
let AnnouncementsController = class AnnouncementsController {
    constructor(announcementsService) {
        this.announcementsService = announcementsService;
    }
    create(createAnnouncementDto) {
        return this.announcementsService.create(createAnnouncementDto);
    }
    findAll() {
        return this.announcementsService.findAll();
    }
    findOne(id) {
        return this.announcementsService.findOne(id);
    }
    update(id, updateAnnouncementDto) {
        return this.announcementsService.update(id, updateAnnouncementDto);
    }
    remove(id) {
        return this.announcementsService.remove(id);
    }
};
exports.AnnouncementsController = AnnouncementsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Announcement' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Announcement created.' }),
    (0, swagger_1.ApiBody)({ type: announcements_schema_1.Announcement }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_announcement_dto_1.CreateAnnouncementDto]),
    __metadata("design:returntype", void 0)
], AnnouncementsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Announcements' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All announcements returned.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnnouncementsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Announcement by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Announcement found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcement' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnnouncementsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Announcement' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Announcement updated.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcement to update' }),
    (0, swagger_1.ApiBody)({ type: announcements_schema_1.Announcement }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_announcement_dto_1.UpdateAnnouncementDto]),
    __metadata("design:returntype", void 0)
], AnnouncementsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Announcement' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Announcement deleted.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the announcement to delete' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnnouncementsController.prototype, "remove", null);
exports.AnnouncementsController = AnnouncementsController = __decorate([
    (0, swagger_1.ApiTags)('announcements'),
    (0, common_1.Controller)('announcements'),
    __metadata("design:paramtypes", [announcements_service_1.AnnouncementsService])
], AnnouncementsController);
//# sourceMappingURL=announcements.controller.js.map