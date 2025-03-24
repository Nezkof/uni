// import { TestBed } from '@angular/core/testing';
// import { Course } from '../models/course.model';
// import { Training } from '../models/training.model';
// import { Consultation } from '../models/consultation.model';
// import { Seminar } from '../models/seminar.model';
// import { ServiceFactory, ServiceType } from './service.factory';

// describe('ServiceFactory', () => {
//   let serviceFactory: ServiceFactory;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     serviceFactory = TestBed.inject(ServiceFactory);
//   });

//   it('should create a Course service', () => {
//     const courseData = {
//       id: '1',
//       title: 'Angular Basics',
//       description: 'Learn Angular step by step',
//       price: 100,
//       duration: 10,
//     };

//     const course = serviceFactory.createService(ServiceType.Course, courseData);

//     expect(course).toBeInstanceOf(Course);
//     expect(course.getId()).toBe(courseData.id);
//     expect(course.getTitle()).toBe(courseData.title);
//     expect(course.getDescription()).toBe(courseData.description);
//     expect(course.getPrice()).toBe(courseData.price);
//     expect(course.getDuration()).toBe(courseData.duration);
//   });

//   it('should create a Training service', () => {
//     const trainingData = {
//       id: '2',
//       title: 'Advanced Angular',
//       description: 'Learn advanced Angular concepts',
//       price: 150,
//       duration: 15,
//       level: 'Advanced',
//     };

//     const training = serviceFactory.createService(
//       ServiceType.Training,
//       trainingData
//     );

//     expect(training).toBeInstanceOf(Training);
//     expect(training.getId()).toBe(trainingData.id);
//     expect(training.getTitle()).toBe(trainingData.title);
//     expect(training.getDescription()).toBe(trainingData.description);
//     expect(training.getPrice()).toBe(trainingData.price);
//     expect(training.getDuration()).toBe(trainingData.duration);
//   });

//   it('should create a Consultation service', () => {
//     const consultationData = {
//       id: '3',
//       title: 'Career Counseling',
//       description: 'Get professional advice on career development',
//       price: 50,
//       duration: 1,
//       expert: 'John Doe',
//     };

//     const consultation = serviceFactory.createService(
//       ServiceType.Consultation,
//       consultationData
//     );

//     expect(consultation).toBeInstanceOf(Consultation);
//     expect(consultation.getId()).toBe(consultationData.id);
//     expect(consultation.getTitle()).toBe(consultationData.title);
//     expect(consultation.getDescription()).toBe(consultationData.description);
//     expect(consultation.getPrice()).toBe(consultationData.price);
//     expect(consultation.getDuration()).toBe(consultationData.duration);
//   });

//   it('should create a Seminar service', () => {
//     const seminarData = {
//       id: '4',
//       title: 'Leadership Skills',
//       description: 'Develop leadership skills for career advancement',
//       price: 200,
//       duration: 5,
//       lector: 'Dr. Smith',
//     };

//     const seminar = serviceFactory.createService(
//       ServiceType.Seminar,
//       seminarData
//     );

//     expect(seminar).toBeInstanceOf(Seminar);
//     expect(seminar.getId()).toBe(seminarData.id);
//     expect(seminar.getTitle()).toBe(seminarData.title);
//     expect(seminar.getDescription()).toBe(seminarData.description);
//     expect(seminar.getPrice()).toBe(seminarData.price);
//     expect(seminar.getDuration()).toBe(seminarData.duration);
//   });

//   it('should throw error for unknown service type', () => {
//     expect(() => {
//       serviceFactory.createService('unknown' as ServiceType, {});
//     }).toThrowError('Unknown service type');
//   });
// });
