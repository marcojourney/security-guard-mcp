import { Injectable } from '@nestjs/common';
import { SanitizerService } from '../../sanitizer/src/sanitizer.service';

@Injectable()
export class ScannerService {
  constructor(private readonly sanitizerService: SanitizerService) {}

  /**
   * Scans a file path for security violations.
   */
  async scanFile(filePath: string): Promise<{ safe: boolean; reason?: string }> {
    if (this.sanitizerService.isSensitiveFile(filePath)) {
      return { safe: false, reason: 'Access to sensitive system file blocked.' };
    }
    return { safe: true };
  }

  /**
   * Scans content (e.g., tool output or prompt) for sensitive data.
   */
  scanContent(content: any): any {
    return this.sanitizerService.mask(content);
  }
}
