"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCounterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_counter_dto_1 = require("./create-counter.dto");
class UpdateCounterDto extends (0, swagger_1.PartialType)(create_counter_dto_1.CreateCounterDto) {
}
exports.UpdateCounterDto = UpdateCounterDto;
//# sourceMappingURL=update-counter.dto.js.map