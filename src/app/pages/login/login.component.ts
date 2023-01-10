import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:FormControl = new FormControl('', [Validators.required, Validators.email]);
  password:FormControl<string | null> = new FormControl<string | null>('', [Validators.maxLength(8), Validators.required])
  advertencia:string = ''
  constructor(private LoginServices:LoginService) { }

  ngOnInit(){
    this.email.valueChanges.subscribe(resp=>{
      if (resp.length > 0) {
        this.advertencia = ''
      }      
    })
    this.password.valueChanges.subscribe((resp2:any)=>{ 
      if (resp2.length > 0) {
          this.advertencia = ''
        }
    })
  }
  ngOnChanges():void{
    
  }
  login():void{
    let validado = this.validarEnvio();
    if (!validado) {
      return
    }
    this.LoginServices.login({email:this.email.value, password:this.password.value}).subscribe((resp:any)=>{
      let {message, icon} = resp
      Swal.fire({
        text:message,
        icon
      });
    }, (error:any)=>{
      let {message, icon} = error.error
      Swal.fire({
        text:message,
        icon
      })
    })
    
  }
  validarEnvio():any{
    if (!this.email.valid || !this.password.valid) {
        this.advertencia = "Asegurese de llenar los datos correctamente"
        return false
    }
    this.advertencia = "";
    return true
  }
  CambiarAdvertencia(event:any):any{
    console.log(event);
    
    console.log(this.email.value);
    
  }
}
