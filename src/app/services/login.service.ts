import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { environment } from 'src/environments/environment';

interface user{
  password:any,
  email:String
}
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  token = localStorage.getItem('token');
  header = new HttpHeaders({
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'MyClientCert': '',        // This is empty
    // 'MyToken': ''     ,         // This is empty
    "Access-Control-Allow-Origin":"*"
  })
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', ['*'])
  .set('Authorization', `Bearer ${this.token}`)

  constructor(private http: HttpClient) { }

  login(usuario:user):Observable<any>{

    let {URI} = environment;
    return this.http.post(`${URI}/login`, usuario)

  }
  ValidarToken():Promise<any>{
    let {URI} = environment;
    return new Promise((resolve, reject)=>{
      this.http.get(`${URI}/ValidarToken`, {headers:this.header}).subscribe(result=>{
        resolve(result)
      })
    }) 
   
  }
  GetListUser():Observable<any>{
    let {URI} = environment
    return this.http.get(`${URI}/listausers`)
  }
}
