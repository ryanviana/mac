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
exports.CounterController = void 0;
const common_1 = require("@nestjs/common");
const counter_service_1 = require("./counter.service");
const create_counter_dto_1 = require("./dto/create-counter.dto");
const update_counter_dto_1 = require("./dto/update-counter.dto");
let CounterController = class CounterController {
    constructor(counterService) {
        this.counterService = counterService;
    }
    create(createCounterDto) {
        return this.counterService.create(createCounterDto);
    }
    findAll() {
        return this.counterService.findAll();
    }
    findOne(id) {
        return this.counterService.findOne(id);
    }
    update(id, updateCounterDto) {
        return this.counterService.update(id, updateCounterDto);
    }
};
exports.CounterController = CounterController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_counter_dto_1.CreateCounterDto]),
    __metadata("design:returntype", void 0)
], CounterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CounterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CounterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_counter_dto_1.UpdateCounterDto]),
    __metadata("design:returntype", void 0)
], CounterController.prototype, "update", null);
exports.CounterController = CounterController = __decorate([
    (0, common_1.Controller)('counter'),
    __metadata("design:paramtypes", [counter_service_1.CounterService])
], CounterController);
//# sourceMappingURL=counter.controller.js.map