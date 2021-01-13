import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface User {
    id: number;
    name: string;
    email: string;
    website: string;
}

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com';

@Injectable({
    providedIn: 'root'
})
export class DemoService {
    constructor(
        private httpClient: HttpClient
    ){
    }

    getUser():Observable<User[]> {
        return this.httpClient.get<User[]>(`${API_ENDPOINT}/users`);
    }
}