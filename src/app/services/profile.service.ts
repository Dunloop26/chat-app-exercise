import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  sendProfileData(data : any) : Observable<any> {
    return this.http.post<any>('api/profile', data);
  }
}
