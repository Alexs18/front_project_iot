import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {

   header = new HttpHeaders({
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'MyClientCert': '',        // This is empty
    // 'MyToken': ''     ,         // This is empty
    "Access-Control-Allow-Origin":"*"
  })
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', ['*']);

  constructor(private http: HttpClient) {

  }

  CrearSensor(sensordata:any):Observable<any>{
    let {URI} = environment
    return this.http.post(`${URI}/registersensor`, sensordata);
  }
  GetSensors():Observable<any>{
    let {URI} = environment
    return this.http.get(`${URI}/listsensor`);
  }
  DeleteSensor(id:number):Observable<any>{
    let {URI} = environment;
    return this.http.put(`${URI}/deletelogic/${id}`, this.header);
  }

}
