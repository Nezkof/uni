import { SortByRatingPipe } from './sort-by-rating.pipe';
import { IService } from 'src/app/models/service.model';

describe('SortByRatingPipe', () => {
  let pipe: SortByRatingPipe;

  beforeEach(() => {
    pipe = new SortByRatingPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort services by rating in ascending order', () => {
    const services: IService[] = [
      { getRating: () => 4 } as IService,
      { getRating: () => 2 } as IService,
      { getRating: () => 5 } as IService,
      { getRating: () => 3 } as IService,
    ];

    const sortedServices = pipe.transform(services, true);

    expect(sortedServices.map((s) => s.getRating())).toEqual([2, 3, 4, 5]);
  });

  it('should sort services by rating in descending order', () => {
    const services: IService[] = [
      { getRating: () => 4 } as IService,
      { getRating: () => 2 } as IService,
      { getRating: () => 5 } as IService,
      { getRating: () => 3 } as IService,
    ];

    const sortedServices = pipe.transform(services, false);

    expect(sortedServices.map((s) => s.getRating())).toEqual([5, 4, 3, 2]);
  });

  it('should return an empty array when given an empty array', () => {
    expect(pipe.transform([], true)).toEqual([]);
  });

  it('should not modify the original array', () => {
    const services: IService[] = [
      { getRating: () => 4 } as IService,
      { getRating: () => 2 } as IService,
      { getRating: () => 5 } as IService,
    ];

    const original = [...services];
    pipe.transform(services, true);

    expect(services).toEqual(original);
  });
});
