import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private isAscendingSubject = new BehaviorSubject<boolean>(true);
  isAscending$ = this.isAscendingSubject.asObservable();

  setSorting(ascending: boolean) {
    this.isAscendingSubject.next(ascending);
  }
}
