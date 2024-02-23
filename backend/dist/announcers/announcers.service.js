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
exports.AnnouncersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const announcers_schema_1 = require("./announcers.schema");
let AnnouncersService = class AnnouncersService {
    constructor(announcerModel) {
        this.announcerModel = announcerModel;
    }
    async create(createAnnouncerDto) {
        const newAnnouncer = new this.announcerModel(createAnnouncerDto);
        return newAnnouncer.save();
    }
    async findAll() {
        return this.announcerModel.find().exec();
    }
    async findOne(id) {
        return this.announcerModel.findById(id).exec();
    }
    async update(id, updateAnnouncerDto) {
        return this.announcerModel
            .findByIdAndUpdate(id, updateAnnouncerDto, { new: true })
            .exec();
    }
    remove(id) {
        return this.announcerModel.findByIdAndDelete(id).exec();
    }
};
exports.AnnouncersService = AnnouncersService;
exports.AnnouncersService = AnnouncersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(announcers_schema_1.Announcer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnnouncersService);
//# sourceMappingURL=announcers.service.js.map