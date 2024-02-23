"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnnouncerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_announcer_dto_1 = require("./create-announcer.dto");
class UpdateAnnouncerDto extends (0, mapped_types_1.PartialType)(create_announcer_dto_1.CreateAnnouncerDto) {
}
exports.UpdateAnnouncerDto = UpdateAnnouncerDto;
//# sourceMappingURL=update-announcer.dto.js.map