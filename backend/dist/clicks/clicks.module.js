"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksModule = void 0;
const common_1 = require("@nestjs/common");
const clicks_controller_1 = require("./clicks.controller");
const clicks_service_1 = require("./clicks.service");
const mongoose_1 = require("@nestjs/mongoose");
const clicks_schema_1 = require("./clicks.schema");
let LinksModule = class LinksModule {
};
exports.LinksModule = LinksModule;
exports.LinksModule = LinksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: clicks_schema_1.Click.name, schema: clicks_schema_1.ClickSchema }]),
        ],
        controllers: [clicks_controller_1.ClicksController],
        providers: [clicks_service_1.ClicksService],
        exports: [clicks_service_1.ClicksService],
    })
], LinksModule);
//# sourceMappingURL=clicks.module.js.map