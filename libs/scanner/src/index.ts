import { Module } from '@nestjs/common';
import { SanitizerModule } from '../../sanitizer/src';
import { ScannerService } from './scanner.service';

@Module({
  imports: [SanitizerModule],
  providers: [ScannerService],
  exports: [ScannerService],
})
export class ScannerModule {}
