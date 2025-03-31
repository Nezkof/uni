import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return minutes correctly', () => {
    expect(pipe.transform(30)).toBe('30 хв');
    expect(pipe.transform(59)).toBe('59 хв');
  });

  it('should return hours correctly', () => {
    expect(pipe.transform(60)).toBe('1 година');
    expect(pipe.transform(120)).toBe('2 години');
    expect(pipe.transform(240)).toBe('4 години');
    expect(pipe.transform(300)).toBe('5 годин');
    expect(pipe.transform(720)).toBe('12 годин');
  });

  it('should return days correctly', () => {
    expect(pipe.transform(1440)).toBe('1 день');
    expect(pipe.transform(2880)).toBe('2 дні');
    expect(pipe.transform(4320)).toBe('3 дні');
    expect(pipe.transform(5760)).toBe('4 дні');
    expect(pipe.transform(7200)).toBe('5 днів');
    expect(pipe.transform(10080)).toBe('7 днів');
  });
});
