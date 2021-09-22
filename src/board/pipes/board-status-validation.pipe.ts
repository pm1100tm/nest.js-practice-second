import { BoardStatus } from '../enum/board-status.enum';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class BoardStatusValidation implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException('not valid status value');
    }
    return value;
  }

  public isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
