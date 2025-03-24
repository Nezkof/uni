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
import { Observable, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private collectionRef: CollectionReference<DocumentData>;
  private serviceTypeCollectionRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'services');
    this.serviceTypeCollectionRef = collection(this.firestore, 'serviceTypes');
  }

  getServiceTypesItems(): Observable<DocumentData[]> {
    return from(getDocs(this.serviceTypeCollectionRef)).pipe(
      map((querySnapshot) => {
        const items: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        return items;
      })
    );
  }

  addServiceTypeItem(data: any): Observable<string> {
    return from(addDoc(this.serviceTypeCollectionRef, data)).pipe(
      map((docRef) => docRef.id)
    );
  }

  deleteServiceTypeItem(id: string): Observable<void> {
    const q = query(this.serviceTypeCollectionRef, where('id', '==', id));

    return from(getDocs(q)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = doc(
            this.firestore,
            'serviceTypes',
            querySnapshot.docs[0].id
          );

          return from(deleteDoc(docRef));
        } else {
          throw new Error(`Document with id=${id} not found`);
        }
      })
    );
  }

  updateServiceTypeItem(id: string, data: any) {
    const q = query(this.serviceTypeCollectionRef, where('id', '==', id));

    return from(getDocs(q)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = doc(
            this.firestore,
            'serviceTypes',
            querySnapshot.docs[0].id
          );
          return from(updateDoc(docRef, data));
        } else {
          throw new Error(`Document with id=${id} not found`);
        }
      })
    );
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

  updateItem(id: string, data: any) {
    const q = query(this.collectionRef, where('id', '==', id));

    return from(getDocs(q)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = doc(
            this.firestore,
            'services',
            querySnapshot.docs[0].id
          );
          return from(updateDoc(docRef, data));
        } else {
          throw new Error(`Document with id=${id} not found`);
        }
      })
    );
  }

  deleteItem(id: string): Observable<void> {
    const q = query(this.collectionRef, where('id', '==', id));

    return from(getDocs(q)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = doc(
            this.firestore,
            'services',
            querySnapshot.docs[0].id
          );

          return from(deleteDoc(docRef));
        } else {
          throw new Error(`Document with id=${id} not found`);
        }
      })
    );
  }
}
