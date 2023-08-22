import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminusersService {

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*",
      "Authorization": `Bearer ${token}`
    });
  }

  header = new HttpHeaders({
    "Access-Control-Allow-Origin":"*"
  })
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', ['*'])
  .set('authorization', `${this.getToken()}`)

  constructor(private http:HttpClient) { }

  DeleteUser(id:any){
    let {URI} = environment;
    return this.http.put(`${URI}/DeleteUser/${id}`,{headers:this.getHeaders()});
  }
  UpdateUser(id:any, user:any){
    let {URI} = environment;
    return this.http.put(`${URI}/EditUser/${id}`,user,{headers:this.getHeaders()});
  }
  RegistrarUser(user:any){
    let {URI}= environment;
    this.http.post(`${URI}/register`, user, {headers:this.getHeaders()});
  }
}
