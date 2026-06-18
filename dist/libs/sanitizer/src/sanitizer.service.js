"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizerService = void 0;
const common_1 = require("@nestjs/common");
let SanitizerService = class SanitizerService {
    constructor() {
        this.sensitiveKeys = [
            'password',
            'secret',
            'token',
            'apikey',
            'privateKey',
            'clientSecret',
        ];
        this.sensitiveFiles = [
            /^\.env(\..*)?$/,
            /.*\.pem$/,
            /.*\.p12$/,
            /.*\.jks$/,
            /.*\.key$/,
            /^id_rsa$/,
            /^known_hosts$/,
            /^application-prod\.yaml?$/,
            /^terraform\.tfvars$/,
            /^secrets\/.*$/,
        ];
    }
    mask(data) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((item) => this.mask(item));
        }
        const maskedData = { ...data };
        for (const key in maskedData) {
            if (this.sensitiveKeys.some((sk) => key.toLowerCase().includes(sk.toLowerCase()))) {
                maskedData[key] = '********';
            }
            else if (typeof maskedData[key] === 'object') {
                maskedData[key] = this.mask(maskedData[key]);
            }
        }
        return maskedData;
    }
    isSensitiveFile(filePath) {
        const normalizedPath = filePath.replace(/\\/g, '/');
        return this.sensitiveFiles.some((pattern) => pattern.test(normalizedPath));
    }
};
exports.SanitizerService = SanitizerService;
exports.SanitizerService = SanitizerService = __decorate([
    (0, common_1.Injectable)()
], SanitizerService);
//# sourceMappingURL=sanitizer.service.js.map