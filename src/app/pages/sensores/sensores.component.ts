import { Component, OnInit } from '@angular/core';
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
  listSensors:any[] = <any>[];
  constructor(private ServiceSensor:SensoresService) { }
  FaMicro = faMicrochip
  FaPlus = faPlus
  ngOnInit(): void {
    this.Getsensors();
  }

  CrearSensor(){
    let sensordata = {
      sensor:{
        elementoquimico: this.elementoquimico,
        descripcion:this.descripcionsensor
      }
    }
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
    let mes1 = ''
    let mes = tiempo.getMonth()+1;
    if (mes.toLocaleString().length >1) {
      mes1 = `0${mes}`
    }
    let dia = tiempo.getDate().toLocaleString();
    let año = tiempo.getFullYear();
    if (mes1.length >0) {
      let fecha1 = `${mes1}/${dia}/${año}`
      console.log(fecha1);
    }else{
    let fecha1 = `${mes}/${dia}/${año}`
    console.log(fecha1);
    }

    
    let hora = tiempo.getHours();
    let minutos = tiempo.getMinutes();
    let segundos = tiempo.getSeconds();
    let medida = `${hora}:${minutos}:${segundos}`
    
    medidas.fecha_creacion = medida
    return medidas
  }
  async AgregarFechaFormato(listasensores:any){
    for await (const sensor of listasensores) {
        this.ObtenerHora(sensor);  
    }
  }

}
