"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const creators_module_1 = require("./creators/creators.module");
const announcers_module_1 = require("./announcers/announcers.module");
const announcements_module_1 = require("./announcements/announcements.module");
const announcers_schema_1 = require("./announcers/announcers.schema");
const creators_schema_1 = require("./creators/creators.schema");
const announcements_schema_1 = require("./announcements/announcements.schema");
const creators_controller_1 = require("./creators/creators.controller");
const announcers_controller_1 = require("./announcers/announcers.controller");
const announcements_controller_1 = require("./announcements/announcements.controller");
const creators_service_1 = require("./creators/creators.service");
const announcers_service_1 = require("./announcers/announcers.service");
const announcements_service_1 = require("./announcements/announcements.service");
const clicks_module_1 = require("./clicks/clicks.module");
const references_module_1 = require("./references/references.module");
const tokens_module_1 = require("./tokens/tokens.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://rgb:admin@nodeexpress.ps2xp1a.mongodb.net/?retryWrites=true&w=majority', { dbName: 'MAC_AVALANCHE' }),
            mongoose_1.MongooseModule.forFeature([
                { name: announcers_schema_1.Announcer.name, schema: announcers_schema_1.AnnouncerSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: creators_schema_1.Creator.name, schema: creators_schema_1.CreatorSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: announcements_schema_1.Announcement.name, schema: announcements_schema_1.AnnouncementSchema },
            ]),
            creators_module_1.CreatorsModule,
            announcers_module_1.AnnouncersModule,
            announcements_module_1.AnnouncementsModule,
            clicks_module_1.LinksModule,
            references_module_1.ReferencesModule,
            tokens_module_1.TokensModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'swagger-static'),
                serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            creators_controller_1.CreatorsController,
            announcers_controller_1.AnnouncersController,
            announcements_controller_1.AnnouncementsController,
        ],
        providers: [
            app_service_1.AppService,
            creators_service_1.CreatorsService,
            announcers_service_1.AnnouncersService,
            announcements_service_1.AnnouncementsService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map