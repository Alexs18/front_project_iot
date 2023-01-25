import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
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

  // header = new HttpHeaders({
  //   // 'Content-Type': 'application/json',
  //   // 'X-Requested-With': 'XMLHttpRequest',
  //   // 'MyClientCert': '',        // This is empty
  //   // 'MyToken': ''     ,         // This is empty
  //   "Access-Control-Allow-Origin":"*"
  // })
//   .set('content-type', 'application/json')
//   .set('Access-Control-Allow-Origin', ['*']);

  constructor(private http: HttpClient) { }

  login(usuario:user):Observable<any>{

    let {URI} = environment;
    return this.http.post(`${URI}/login`, usuario)

  }
  ValidarToken(token:any):Observable<any>{
    let {URI} = environment;
    return this.http.get(`${URI}/ValidarToken/${token}`)
  }
  GetListUser():Observable<any>{
    let {URI} = environment
    return this.http.get(`${URI}/listausers`)
  }
}
