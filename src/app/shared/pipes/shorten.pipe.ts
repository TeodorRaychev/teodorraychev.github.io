import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, maxCount: number = 10): string {
    return `${value.substring(0, maxCount)}${value.length > maxCount? '...': ''}`;
  }

}
