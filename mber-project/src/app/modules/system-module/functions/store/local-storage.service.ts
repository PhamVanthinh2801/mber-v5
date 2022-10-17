import {Injectable} from '@angular/core';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  user: any;

  constructor(public router: Router) {
    this.user = window.localStorage.getItem('userName');
  }

  ngOnInit() {
  }

  getUserFromStorage() {
    return JSON.parse(<string>window.localStorage.getItem('userName') );
  }

  setUserToStorage(sParam: any) {
    window.localStorage.setItem('userName', JSON.stringify(sParam));
  }

  setToken(sParam) {
    window.localStorage.setItem('accessToken', JSON.stringify(sParam));
  }
  getToken(){
    return JSON.parse(<string>window.localStorage.getItem('accessToken') );
  }

  logout(): void {
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
