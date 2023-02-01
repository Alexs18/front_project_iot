import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminusersService {

  header = new HttpHeaders({
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'MyClientCert': '',        // This is empty
    // 'MyToken': ''     ,         // This is empty
    "Access-Control-Allow-Origin":"*"
  })
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', ['*']);

  constructor(private http:HttpClient) { }

  DeleteUser(id:any){
    let {URI} = environment;
    return this.http.put(`${URI}/DeleteUser/${id}`,{headers:this.header});
  }
  UpdateUser(id:any, user:any){
    let {URI} = environment;
    return this.http.put(`${URI}/EditUser/${id}`,user,{headers:this.header});
  }
  RegistrarUser(user:any){
    let {URI}= environment;
    this.http.post(`${URI}/register`, user, {headers:this.header});
  }
}
