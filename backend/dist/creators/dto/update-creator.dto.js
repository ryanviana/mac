"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCreatorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_creator_dto_1 = require("./create-creator.dto");
class UpdateCreatorDto extends (0, mapped_types_1.PartialType)(create_creator_dto_1.CreateCreatorDto) {
}
exports.UpdateCreatorDto = UpdateCreatorDto;
//# sourceMappingURL=update-creator.dto.js.map