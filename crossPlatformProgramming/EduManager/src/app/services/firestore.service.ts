import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  query,
  where,
} from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private collectionRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'services');
  }

  addItem(data: any): Observable<string> {
    return from(addDoc(this.collectionRef, data)).pipe(
      map((docRef) => docRef.id)
    );
  }

  getItems(): Observable<DocumentData[]> {
    return from(getDocs(this.collectionRef)).pipe(
      map((querySnapshot) => {
        const items: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        return items;
      })
    );
  }

  updateItem(id: string, data: any): Observable<void> {
    const itemDocRef = doc(this.firestore, 'services', id);
    return from(updateDoc(itemDocRef, data)).pipe(map(() => void 0));
  }

  deleteItem(id: number) {}
}
