import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Item } from '../models/Item';

@Injectable({ providedIn: 'root' })

export class FakeDataService {
  //gerçek bir http isteği gibi olması için loading özelliği için delay ile geciktiriyorz tüm işlemleri
  getItems(): Observable<Item[]> {
    const count = Math.floor(Math.random() * 5) + 1;
    const items: Item[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      name: `Item-${Math.random().toString(36).substring(2, 7)}`,
    }));
    return of(items).pipe(delay(Math.random() * 1000));
  }
//ekleyip observabledöndük subscribe için
  addItem(name: string): Observable<Item> {
    const newItem: Item = {
      id: Date.now(),
      name,
    };
    return of(newItem).pipe(delay(Math.random() * 1000));
  }
//silip observable döndük
  deleteItem(id: number): Observable<void> {
    return of(undefined).pipe(delay(Math.random() * 1000));
  }
}
