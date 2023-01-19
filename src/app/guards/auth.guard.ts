import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token = localStorage.getItem('token');
  constructor(
    private loginservice:LoginService,
    private router:Router
  ){

  }
  ValidarToken():any{
    this.loginservice.ValidarToken(this.token).subscribe(resp=>{
      console.log('pasa por la calidacon');
      console.log(resp);
      
      let {tokenvalid} = resp;
      this.router.navigate(['Home']);
      return tokenvalid
    }, error=>{
      console.log('agarra  el error');
      console.log(error);
      return false
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
    let token = this.ValidarToken();
    if (!token) {
      return false;
    }  
    return true
  }
  
}
