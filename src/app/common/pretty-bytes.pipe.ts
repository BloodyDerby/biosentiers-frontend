import { Pipe, PipeTransform } from '@angular/core';

import { prettyBytes } from '../utils/pretty-bytes';

@Pipe({
  name: 'prettyBytes'
})
export class PrettyBytesPipe implements PipeTransform {
  transform(value: number): string {
    return prettyBytes(value);
  }
}
