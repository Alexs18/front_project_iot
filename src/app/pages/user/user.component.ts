import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { LoginService } from 'src/app/services/login.service';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface StructureListUser {
  id:number;
  usuario: string;
  correo: string;
  telefono: number;
  estado: string;
  descripcion: string
}

//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  ope:boolean = false;
  admin:boolean = false;
  CrearUsuario:boolean = false;
  listaUsuarios:StructureListUser[] = [{id:0,usuario: '',correo:'', telefono:0, 
    estado:'', descripcion:''}]
  displayedColumns: string[] = ['id', 'usuario', 'correo', 'telefono','estado', 'descripcion'];
  dataSource = new MatTableDataSource<StructureListUser>(this.listaUsuarios);
  
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  registrationForm!: FormGroup;
  constructor(private ServiceUser:LoginService,
    private readonly fb: FormBuilder,
    private readonly _LoginServices:LoginService) { }

  administracion= faGear
  // @ViewChild(MatPaginator) : MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }
  ngOnInit() {
    this.registrationForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      idrol:[''],
      operador:[false],
      administrador:[false]
    }, { validator: this.passwordMatchValidator });
    this.GetUser();
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
        this.GetUser();
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

  GetUser(){
    this.ServiceUser.GetListUser().subscribe(resp=>{
      console.log(resp.users);
      
      this.listaUsuarios = resp.users
    })
  }
  OpenUser(){
    this.CrearUsuario = !this.CrearUsuario;
  }

  onCheckboxChange(event:any) {
    console.log('pasa');
    console.log(event);
    console.log(event.target.value);
    
    const checkboxValue = event.target.value;
    if (checkboxValue === 'administrador') {
      this.registrationForm.get('idrol')?.setValue('1');
      this.registrationForm.get('operador')?.setValue(false);
    } else if (checkboxValue === 'operador') {
      this.registrationForm.get('idrol')?.setValue('2');
      this.registrationForm.get('administrador')?.setValue(false);
    }
    console.log(this.registrationForm.value);
    
  }
  hola(){
    console.log();
    
    console.log('hola');
    
  }

}
