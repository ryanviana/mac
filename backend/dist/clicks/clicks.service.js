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
exports.ClicksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const clicks_schema_1 = require("./clicks.schema");
let ClicksService = class ClicksService {
    constructor(clickModel) {
        this.clickModel = clickModel;
    }
    async create(createClickDto) {
        const newCreator = new this.clickModel(createClickDto);
        return newCreator.save();
    }
    async findAll() {
        return this.clickModel.find().exec();
    }
    async findOne(id) {
        return this.clickModel.findById(id).exec();
    }
    async update(id, updateClickDto) {
        return this.clickModel
            .findByIdAndUpdate(id, updateClickDto, { new: true })
            .exec();
    }
    async remove(id) {
        return this.clickModel.findByIdAndDelete(id).exec();
    }
    async hasAtLeastThousandUnpaidClicks(reference) {
        const count = await this.clickModel
            .countDocuments({ reference: reference, paid: false })
            .exec();
        return {
            hasAtLeastThousandUnpaidClicks: count >= 1000,
            unpaidClicksCount: count,
            message: count >= 1000
                ? 'There are at least 1000 unpaid clicks'
                : 'There are less than 1000 unpaid clicks',
        };
    }
    async markAllClicksAsPaid() {
        const result = await this.clickModel.updateMany({ paid: false }, { $set: { paid: true } });
        return { updatedCount: result.modifiedCount };
    }
    async checkIfIpAlreadyClicked(ip, reference) {
        const count = await this.clickModel
            .countDocuments({ reference: reference, ip: ip })
            .exec();
        return count > 0;
    }
    async countClicksByProposalId(proposalId) {
        const count = await this.clickModel
            .countDocuments({ proposalId: proposalId })
            .exec();
        return {
            clicks: count,
            proposalId: proposalId,
        };
    }
};
exports.ClicksService = ClicksService;
exports.ClicksService = ClicksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(clicks_schema_1.Click.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClicksService);
//# sourceMappingURL=clicks.service.js.map