"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScannerService = void 0;
const common_1 = require("@nestjs/common");
const sanitizer_service_1 = require("../../sanitizer/src/sanitizer.service");
let ScannerService = class ScannerService {
    constructor(sanitizerService) {
        this.sanitizerService = sanitizerService;
    }
    async scanFile(filePath) {
        if (this.sanitizerService.isSensitiveFile(filePath)) {
            return { safe: false, reason: 'Access to sensitive system file blocked.' };
        }
        return { safe: true };
    }
    scanContent(content) {
        return this.sanitizerService.mask(content);
    }
};
exports.ScannerService = ScannerService;
exports.ScannerService = ScannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sanitizer_service_1.SanitizerService])
], ScannerService);
//# sourceMappingURL=scanner.service.js.map