
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'StatusLetterTo'})
export class StatusLetterToPipe implements PipeTransform {
  transform(value: number): string {
    if (value == 1) {
      return 'Thư mới';
    }
    if (value == 2) {
      return 'Thư chưa nhận';
    }
    if (value == 3) {
      return 'Thư đã nhận'
    }
    return ''
  }
}
