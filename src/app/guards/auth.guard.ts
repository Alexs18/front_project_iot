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
  async ValidarToken(){
    let tokenresul = await this.loginservice.ValidarToken();
    let {tokenvalid} = tokenresul;
    return tokenvalid
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
    let token = this.ValidarToken();
    if (!token) {
      this.router.navigate(['login']);  
      return false;
    }
    return true
  }
  
}
