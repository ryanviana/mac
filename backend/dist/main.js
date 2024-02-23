"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const announcements_schema_1 = require("./announcements/announcements.schema");
const announcers_schema_1 = require("./announcers/announcers.schema");
const app_module_1 = require("./app.module");
const clicks_schema_1 = require("./clicks/clicks.schema");
const creators_schema_1 = require("./creators/creators.schema");
const references_schema_1 = require("./references/references.schema");
async function bootstrap() {
    const cors = require('cors');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MAC API')
        .setDescription('APIs for MAC application.')
        .setVersion('1.0')
        .addTag('mac')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [announcements_schema_1.Announcement, creators_schema_1.Creator, announcers_schema_1.Announcer, clicks_schema_1.Click, references_schema_1.Reference],
    });
    swagger_1.SwaggerModule.setup('swagger', app, document, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
        ],
    });
    app.use(cors());
    dotenv.config();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map