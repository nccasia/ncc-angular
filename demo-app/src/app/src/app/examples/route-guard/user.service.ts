import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = {
    username: 'user-1'
  };
  constructor() { }

}
