import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'bgUrl' })
export class BackgroundUrl implements PipeTransform {
  transform(value: string | undefined): string {
    console.log(value);
    return value as string;
  }
}
