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
@Pipe({ name: 'postTime' })
export class PostTimePipe implements PipeTransform {
  transform(value: string | undefined): string {
    // console.log(value);
    const date = new Date(value as string);
    const diff = new Date().getTime() - date.getTime();
    const hour = Math.floor(diff / (1000 * 60 * 60));
    const minute = Math.floor(diff / (1000 * 60));
    if (minute < 60) {
      return `${minute} minutes ago`;
    } else if (hour > 24) {
      return date.toDateString();
    } else {
      return `${hour} hours ago`;
    }
  }
}
