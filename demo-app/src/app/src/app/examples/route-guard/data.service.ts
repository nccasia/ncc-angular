import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const dataList: any[] = [
  {
    id: '1',
    slug: 'bai-viet-1',
    title: 'Bai viet 1',
    content: 'Day la noi dung bai viet 1',
    author: 'user-1',
  },
  {
    id: '2',
    slug: 'bai-viet-2',
    title: 'Bai viet 2',
    content: 'Day la noi dung bai viet 2 nhe ',
    author: 'user-2',
  },
];
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getListData(): Observable<any[]> {
    return of(dataList).pipe(delay(500));
  }

  getDataBySlug(slug: string): Observable<any> {
    let data = dataList.find(x => x.slug === slug)
    return of(data).pipe(delay(500));
  }
}
