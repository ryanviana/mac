"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_token_dto_1 = require("./create-token.dto");
class UpdateTokenDto extends (0, swagger_1.PartialType)(create_token_dto_1.CreateTokenDto) {
}
exports.UpdateTokenDto = UpdateTokenDto;
//# sourceMappingURL=update-token.dto.js.map