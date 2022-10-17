import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'TypeLetter'})
export class TypeLetterPipe implements PipeTransform {
  transform(value: number): string {
    if (value == 1) {
      return 'Nội bộ';
    }
    if (value == 2) {
      return 'Bên ngoài';
    }
    return ''
  }
}
