"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncersModule = void 0;
const common_1 = require("@nestjs/common");
const announcers_service_1 = require("./announcers.service");
const announcers_controller_1 = require("./announcers.controller");
const mongoose_1 = require("@nestjs/mongoose");
const announcers_schema_1 = require("./announcers.schema");
let AnnouncersModule = class AnnouncersModule {
};
exports.AnnouncersModule = AnnouncersModule;
exports.AnnouncersModule = AnnouncersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: announcers_schema_1.Announcer.name, schema: announcers_schema_1.AnnouncerSchema },
            ]),
        ],
        controllers: [announcers_controller_1.AnnouncersController],
        providers: [announcers_service_1.AnnouncersService],
        exports: [announcers_service_1.AnnouncersService],
    })
], AnnouncersModule);
//# sourceMappingURL=announcers.module.js.map