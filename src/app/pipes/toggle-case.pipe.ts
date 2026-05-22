import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCasePipe',
})
export class ToggleCasePipe implements PipeTransform {
  transform(value: string, upper: boolean): string {
    return upper ? value.toUpperCase() : value.toLocaleLowerCase();
  }
}
