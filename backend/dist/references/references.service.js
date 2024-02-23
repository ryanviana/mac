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
exports.ReferencesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const references_schema_1 = require("./references.schema");
let ReferencesService = class ReferencesService {
    constructor(referenceModel) {
        this.referenceModel = referenceModel;
    }
    async create(createReferenceDto) {
        const newReference = new this.referenceModel(createReferenceDto);
        return newReference.save();
    }
    async findAll() {
        return this.referenceModel.find().exec();
    }
    async findOne(id) {
        return this.referenceModel.findById(id).exec();
    }
    async update(id, updateReferenceDto) {
        return this.referenceModel
            .findByIdAndUpdate(id, updateReferenceDto, { new: true })
            .exec();
    }
    async remove(id) {
        return this.referenceModel.findByIdAndDelete(id).exec();
    }
    async getLinkByReference(reference) {
        const result = await this.referenceModel
            .findOne({ reference: reference })
            .select('link')
            .exec();
        return result ? result.link : null;
    }
    async getActiveReferences() {
        return this.referenceModel.find({ active: true }).exec();
    }
    async checkReferenceExists(reference) {
        const result = await this.referenceModel
            .findOne({ reference: reference })
            .exec();
        return result ? true : false;
    }
    async getReferenceByReference(reference) {
        return this.referenceModel.findOne({ reference: '/' + reference }).exec();
    }
};
exports.ReferencesService = ReferencesService;
exports.ReferencesService = ReferencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(references_schema_1.Reference.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReferencesService);
//# sourceMappingURL=references.service.js.map