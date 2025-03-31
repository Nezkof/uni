import { Pipe, PipeTransform } from '@angular/core';
import { IService } from 'src/app/models/service.model';

@Pipe({
  name: 'sortByRatingPipe',
  standalone: true,
})
export class SortByRatingPipe implements PipeTransform {
  transform(services: IService[], ascending: boolean): IService[] {
    return services
      .slice()
      .sort((a, b) =>
        ascending
          ? a.getRating() - b.getRating()
          : b.getRating() - a.getRating()
      );
  }
}
