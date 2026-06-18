export declare class SanitizerService {
    private readonly sensitiveKeys;
    private readonly sensitiveFiles;
    mask(data: any): any;
    isSensitiveFile(filePath: string): boolean;
}
