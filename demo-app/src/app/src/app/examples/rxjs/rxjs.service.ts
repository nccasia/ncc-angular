import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Comment {
    postId: number;
    id: number;
    email: string;
    body: string;
}


export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

@Injectable({
    providedIn: 'root'
})
export class RxjsService {
    private URL = 'https://jsonplaceholder.typicode.com';
    rxjsSubject: Subject<number> = new Subject<number>();


    constructor(private http: HttpClient) {

    }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.URL}/posts`);
    }

    getCommentByPostId(postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.URL}/comments?postId=${postId}`);
    }
}