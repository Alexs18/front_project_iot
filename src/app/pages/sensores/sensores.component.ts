import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { faCoffee , faUser, faMicrochip, faPlus} from '@fortawesome/free-solid-svg-icons';
import { SensoresService } from 'src/app/services/sensores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit {

  descripcionsensor:string = '';
  elementoquimico:string = '';
  imagen:string = '';
  actualizar:boolean = false;
  listSensors:any[] = <any>[];
  idsensor:number = 0;
  @ViewChild('ImgSensor', {static:false}) ImgSensor!: ElementRef;
  @ViewChild('ImgInput', {static:false}) ImgInput!: ElementRef;
  constructor(private ServiceSensor:SensoresService) { }
  FaMicro = faMicrochip
  FaPlus = faPlus
  ngOnInit(): void {
  
    this.Getsensors();
  }
  SensorModel(){
    let sensordata = {
      sensor:{
        elementoquimico: this.elementoquimico,
        descripcion:this.descripcionsensor,
        imagen:this.imagen
      }
    }
    return sensordata;
  }
  SetSensor(sensor:any){
    let {descripcion, elemento_quimico} = sensor;
    this.elementoquimico = elemento_quimico;
    this.descripcionsensor = descripcion;
    this.idsensor = sensor.id;
    this.actualizar = true;
    return sensor
  }
  CrearSensor(){

    let sensordata = this.SensorModel();
    this.ServiceSensor.CrearSensor(sensordata).subscribe(async(data)=>{
        let {message, icon} = data;
       await Swal.fire({
          icon,
          text:message
        });
        this.Getsensors();
    },
    async (error:any)=>{
      let {message, icon} = error;
      await Swal.fire({
         icon,
         text:message
       });
    }
    );
  }
  Getsensors(){
    this.ServiceSensor.GetSensors().subscribe(async(resp)=>{
      let {listasensor} = resp;
      await this.AgregarFechaFormato(listasensor);
      this.listSensors = listasensor
    }, error=>{
      console.log('hay un error en el servidor');
      console.log(error);
    })
  }
  async DeleteSensor(id:number){

    let {isConfirmed} = await this.PreguntarEliminado();
    if (!isConfirmed) {
        return
    }
    this.ServiceSensor.DeleteSensor(id).subscribe(async(resp)=>{
      let {status, message, icon} = resp;
      if (status === 200) {
         await Swal.fire({
            icon,
            text:message
          });
        this.Getsensors();
        return
      }
      

    }, error=>{
      console.log('error en el servidor');
      console.log(error);
      
      
    })
  }
  
  async PreguntarEliminado(){
    let resultado = await Swal.fire({
      title: 'Estas seguro que deseas eliminar el sensor?',
      text: "Esta acción no podrá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, hazlo!'
    });
    return resultado;
  }
  ObtenerHora(medidas:any){
    let tiempo = new Date(medidas.fecha_creacion);
    let Mes = ''
    let MesMedicion = tiempo.getMonth()+1;
    Mes = MesMedicion.toLocaleString.length === 0? Mes = `0${MesMedicion}`: Mes = `${MesMedicion}`;
    let Dia = tiempo.getDay();
    let Anio = tiempo.getFullYear() ;
    let medida = `${Mes}/${Dia}/${Anio}`
    
    medidas.fecha_creacion = medida
    return medidas
  }
  async AgregarFechaFormato(listasensores:any){
    for await (const sensor of listasensores) {
        this.ObtenerHora(sensor);  
    }
  }

  EditarSensor(){
   
    let sensordata = this.SensorModel();
    this.ServiceSensor.UpdateSensor(sensordata, this.idsensor).subscribe(async(resp)=>{
      let {message, icon} = resp;
      await Swal.fire({
         icon,
         text:message
       });
       this.Getsensors();
    }, async (err)=>{
      let {message, icon} = err;
      await Swal.fire({
         icon,
         text:message
       });
    })

  }
  CambiarEstado(){
    this.actualizar = false;
    this.descripcionsensor = '';
    this.elementoquimico = ''
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

 async setImg(event:any){
    let base64 = await this.encodeFileAsBase64URL( event.target.files[0]);
    let SrcImg:HTMLElement = this.ImgSensor.nativeElement;
    this.imagen = `${base64}`
    SrcImg.setAttribute('src', `${base64}`);
  }

  ClickSetImg(){
    let InputClick:HTMLElement = this.ImgInput.nativeElement;
    InputClick.click();
  }

}
