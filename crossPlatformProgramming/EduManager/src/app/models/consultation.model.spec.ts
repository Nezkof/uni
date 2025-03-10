import { Consultation } from './consultation.model';

describe('Consultation', () => {
  let consultation: Consultation;

  beforeEach(() => {
    consultation = new Consultation(
      '1',
      'Business Strategy Consultation',
      'Personalized consultation for your business growth',
      150,
      2,
      'John'
    );
  });

  it('should create an instance of Consultation', () => {
    expect(consultation).toBeTruthy();
  });

  it('should get correct ID', () => {
    expect(consultation.getId()).toBe('1');
  });

  it('should get correct title', () => {
    expect(consultation.getTitle()).toBe('Business Strategy Consultation');
  });

  it('should get correct description', () => {
    expect(consultation.getDescription()).toBe(
      'Personalized consultation for your business growth'
    );
  });

  it('should get correct price', () => {
    expect(consultation.getPrice()).toBe(150);
  });

  it('should get correct duration', () => {
    expect(consultation.getDuration()).toBe(2);
  });

  it('should get correct expert', () => {
    expect(consultation.getExpert()).toBe('John');
  });
});
