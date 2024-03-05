"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const MISSING_REQUIRED_DEPENDENCY = (name, reason) => `The "${name}" package is missing. Please, make sure to install this library ($ npm install ${name}) to take advantage of ${reason}.`;
const logger = new common_1.Logger('PackageLoader');
function loadPackage(packageName, context, loaderFn) {
    try {
        return loaderFn ? loaderFn() : require(packageName);
    }
    catch (e) {
        logger.error(MISSING_REQUIRED_DEPENDENCY(packageName, context));
        process.exit(1);
    }
}
exports.loadPackage = loadPackage;
