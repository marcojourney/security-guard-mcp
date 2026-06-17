import { Injectable } from '@nestjs/common';

@Injectable()
export class SanitizerService {
  private readonly sensitiveKeys = [
    'password',
    'secret',
    'token',
    'apikey',
    'privateKey',
    'clientSecret',
  ];

  private readonly sensitiveFiles = [
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

  /**
   * Masks sensitive values in an object based on keys.
   */
  mask(data: any): any {
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
      } else if (typeof maskedData[key] === 'object') {
        maskedData[key] = this.mask(maskedData[key]);
      }
    }
    return maskedData;
  }

  /**
   * Checks if a file path is considered sensitive and should be blocked.
   */
  isSensitiveFile(filePath: string): boolean {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return this.sensitiveFiles.some((pattern) => pattern.test(normalizedPath));
  }
}
