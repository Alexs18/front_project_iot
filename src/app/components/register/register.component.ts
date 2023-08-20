import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input () loginregister:boolean = false;
  registrationForm!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly _LoginServices:LoginService 
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      idrol: ['2']
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    this.verificarDatos()
    if (this.registrationForm.valid) {
      // Aquí puedes manejar la lógica de registro
      console.log(this.registrationForm.value);
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmarContrasena')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmarContrasena')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmarContrasena')?.setErrors(null);
    }
  }

  async verificarDatos(){
  
    if (!this.registrationForm.invalid) {
      console.log('value');
      console.log(this.registrationForm.value);
      
      this._LoginServices.RegisterUser(this.registrationForm.value)
      .subscribe(async(resp)=>{
        await Swal.fire({
          title:'Operación Exitosa',
          icon:'success',
          text:`${resp.message}`
          });
        this.cerrarmodal();
      },async(error)=>{
        let mensajeserror = ''
        if (error.status === 400) {
          const errores = error.error;
          for await (const iterator of errores.error) {
            mensajeserror += '' + iterator.msg
          }
          await Swal.fire({
          title:'Error al ingresar los datos',
          icon:'warning',
          text:`${mensajeserror}`
          });
          return 
        }
        return await Swal.fire({
        title:'Error Interno',
        icon:'error',
        text:`Ocurrio error interno, contacte con administración`
        });
        
      })
      return
    }
    this.registrationForm.invalid
    await Swal.fire({
      title:'Falló al registrar',
      icon:'warning',
      text:'Al parecer algunos datos estan incompletos, por favor verificar y volver a intentar'
    })
  }

  private cerrarmodal(){
    const modalclose = document.getElementById('CerrarModal');
    modalclose?.click();
  }

}
