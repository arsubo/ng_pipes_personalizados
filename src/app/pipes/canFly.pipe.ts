import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFlyPipe',
})
export class CanFlyPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Puede volar' : 'No puede volar';
  }
}
