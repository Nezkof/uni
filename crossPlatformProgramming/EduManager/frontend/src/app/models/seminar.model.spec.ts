import { Seminar } from './seminar.model';

// describe('Seminar class', () => {
//   let seminar: Seminar;
//   beforeEach(() => {
//     seminar = new Seminar(
//       '1',
//       'Effective Communication Skills',
//       'Learn how to communicate effectively in professional settings',
//       90,
//       3,
//       'Jane Doe'
//     );
//   });
//   it('should create an instance of Seminar', () => {
//     expect(seminar).toBeTruthy();
//   });
//   it('should return the correct id', () => {
//     expect(seminar.getId()).toBe('1');
//   });
//   it('should return the correct title', () => {
//     expect(seminar.getTitle()).toBe('Effective Communication Skills');
//   });
//   it('should return the correct description', () => {
//     expect(seminar.getDescription()).toBe(
//       'Learn how to communicate effectively in professional settings'
//     );
//   });
//   it('should return the correct price', () => {
//     expect(seminar.getPrice()).toBe(90);
//   });
//   it('should return the correct duration', () => {
//     expect(seminar.getDuration()).toBe(3);
//   });
//   it('should return the correct lector', () => {
//     expect(seminar.getLector()).toBe('Jane Doe');
//   });
//   it('should return the correct details as an HTML list', () => {
//     const expectedDetails = `
//     <ul>
//       <li>Title: Effective Communication Skills</li>
//       <li>Description: Learn how to communicate effectively in professional settings</li>
//       <li>Price: 90</li>
//       <li>Duration: 3 hours</li>
//       <li>Expert: Jane Doe </li>
//     </ul>
//   `;
//     expect(seminar.getDetails().trim()).toBe(expectedDetails.trim());
//   });
//});
