import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'StatusLetter'})
export class StatusLetterFromPipe implements PipeTransform {
  transform(value: number): string {
    if (value == 1) {
      return 'Thư mới';
    }
    if (value == 2) {
      return 'Thư đang soạn';
    }
    if (value == 3) {
      return 'Thư trả lại'
    }
    if (value == 4) {
      return 'Thư chờ xử lý'
    }
    if (value == 5) {
      return 'Thư đã gửi'
    }
    if (value == 6) {
      return 'Thư đã nhận'
    }
    return ''
  }
}
