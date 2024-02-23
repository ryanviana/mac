"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnnouncementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_announcement_dto_1 = require("./create-announcement.dto");
class UpdateAnnouncementDto extends (0, mapped_types_1.PartialType)(create_announcement_dto_1.CreateAnnouncementDto) {
}
exports.UpdateAnnouncementDto = UpdateAnnouncementDto;
//# sourceMappingURL=update-announcement.dto.js.map