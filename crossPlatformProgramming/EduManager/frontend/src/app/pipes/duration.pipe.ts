import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    if (duration < 60) {
      return `${duration} хв`;
    } else if (duration < 1440) {
      const hours = Math.floor(duration / 60);
      return `${hours} ${this.getHourLabel(hours)}`;
    } else {
      const days = Math.floor(duration / 1440);
      return `${days} ${this.getDayLabel(days)}`;
    }
  }

  private getHourLabel(hours: number): string {
    return hours === 1
      ? 'година'
      : hours >= 2 && hours <= 4
      ? 'години'
      : 'годин';
  }

  private getDayLabel(days: number): string {
    return days === 1 ? 'день' : days >= 2 && days <= 4 ? 'дні' : 'днів';
  }
}
