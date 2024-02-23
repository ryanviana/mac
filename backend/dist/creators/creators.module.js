"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorsModule = void 0;
const common_1 = require("@nestjs/common");
const creators_controller_1 = require("./creators.controller");
const creators_service_1 = require("./creators.service");
const mongoose_1 = require("@nestjs/mongoose");
const creators_schema_1 = require("./creators.schema");
let CreatorsModule = class CreatorsModule {
};
exports.CreatorsModule = CreatorsModule;
exports.CreatorsModule = CreatorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: creators_schema_1.Creator.name, schema: creators_schema_1.CreatorSchema }]),
        ],
        controllers: [creators_controller_1.CreatorsController],
        providers: [creators_service_1.CreatorsService],
        exports: [creators_service_1.CreatorsService],
    })
], CreatorsModule);
//# sourceMappingURL=creators.module.js.map