import { SanitizerService } from '../../sanitizer/src/sanitizer.service';
export declare class ScannerService {
    private readonly sanitizerService;
    constructor(sanitizerService: SanitizerService);
    scanFile(filePath: string): Promise<{
        safe: boolean;
        reason?: string;
    }>;
    scanContent(content: any): any;
}
