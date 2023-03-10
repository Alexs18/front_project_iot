import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { faCoffee , faUser, faCamera} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, AfterViewInit {

  userform:FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    telefono: new FormControl(''),
    cargo: new FormControl(''),
    estado: new FormControl(''),
  })
  user:any
  @ViewChild('ImgPerfil', {static:false}) ImgPerfil!: ElementRef; 
  @ViewChild('ImgInput', {static:false}) ImgInput!: ElementRef; 

  constructor() { }

  faCoffee = faUser;
  showiconUser:boolean = true;
  cameraicon = faCamera;
  ngOnInit(): void {
    
    let user:any = localStorage.getItem('user');
    this.user = JSON.parse(user);
    console.log('el id....');
    console.log(this.userform.get('id')?.value);
    this.userform.setValue({
      id:this.user.id,
      nombre:this.user.nombre,
      apellido:this.user.apellido,
      correo:this.user.correo,
      estado:this.user.estado,
      telefono:this.user.telefono,
      cargo:this.user.descripcion
    })
    
    console.log('el nuevo id');
    console.log(this.userform.get('id')?.value);

  }
  ngAfterViewInit(): void {
    
    this.ValidImgSrc();
           
  }

  ValidImgSrc(){
    let InputFile:HTMLElement = this.ImgInput.nativeElement;
    let getAtribute = InputFile.getAttribute('src');
    if (getAtribute !== null) {
      return this.showiconUser = false;
    }
    return this.showiconUser = true
  }
  CargarImg(){
    let loadImg:HTMLElement = this.ImgPerfil.nativeElement;
    loadImg.click();
  }

  async encodeFileAsBase64URL(file:any) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(file);
    });
 };
  async ChangeImg(event:any){

    let base64 = await this.encodeFileAsBase64URL( event.target.files[0]);
    let SrcImg:HTMLElement = this.ImgInput.nativeElement;
    SrcImg.setAttribute('src', `${base64}`);
    SrcImg.removeAttribute('style');
    this.ValidImgSrc();

  }

}
