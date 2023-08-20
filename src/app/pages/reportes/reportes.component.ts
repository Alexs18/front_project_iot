import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Chart, ChartTypeRegistry, registerables} from 'chart.js'
import { SensoresService } from 'src/app/services/sensores.service';
import * as moment from 'moment'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit, AfterViewInit {

  @ViewChild('Sensors', {static:false}) Sensors!: ElementRef;
  @ViewChild('TG1', {static:false}) TG1!: ElementRef;
  @ViewChild('TG2', {static:false}) TG2!: ElementRef;
  @ViewChild('TG3', {static:false}) TG3!: ElementRef;
  @ViewChild('TG4', {static:false}) TG4!: ElementRef;

  constructor(
    private ServiceSensor:SensoresService
  ) { }

  public listSensors:any[] = []
  public checked:boolean = true;
  public indeterminate:boolean = false;
  public tagoption:any[] = []
  public charmain:any;
  public datosprint:any[] = [];
  public labelsdatosprint:any[] = [];
  public datadataprint:any[] = [];


  ngOnInit(): void {
    this.Getsensors();
    Chart.register(...registerables)
  }
  async ngAfterViewInit():Promise<void> {
      this.allsensors('bar');
      this.tiposensores();
  }

  allsensors(type:any){
    this.charmain = new Chart(this.Sensors.nativeElement, {
      type,
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: this.labelsdatosprint,
        datasets: [{
          label: 'Mediciones de todos los sensores',
          // data: [12, 19, 3, 5, 2, 3],
          data: this.datadataprint,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  tiposensores(){
    this.tgfuntion(this.TG1.nativeElement, 'line');
    this.tgfuntion(this.TG2.nativeElement, 'radar');
    this.tgfuntion(this.TG3.nativeElement, 'pie');
    this.tgfuntion(this.TG4.nativeElement, 'polarArea');
  }

  tgfuntion(chartcanva:string, typechart:any){
    new Chart(chartcanva,{
      type: typechart,
      data: {
        labels: ['Red', 'Blue'],
        datasets: [{
          label: 'Lineal',
          data: [12, 19],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  tagsoption():{tag:string | any, option:string}[]{
    this.tagoption.push( {tag:this.TG1, option:'bar'} )
    this.tagoption.push({tag:this.TG1, option:'line'})
    this.tagoption.push({tag:this.TG1, option:'polarArea'})
    this.tagoption.push({tag:this.TG1, option:'radar'});
    return this.tagoption
  }

  changegrafic(type:string){
    this.charmain.destroy();
    this.allsensors(type);
    this.ngOnInit();
  }

  Getsensors(){
    this.ServiceSensor.GetSensors().subscribe(async(resp)=>{
      let {listasensor} = resp;
      await this.AgregarFechaFormato(listasensor);
      this.listSensors = listasensor;
      const conmarcas = await this.addmarcados(this.listSensors);
      this.listSensors = conmarcas;
    }, error=>{
      console.log('hay un error en el servidor');
      console.log(error);
    })
  }

  async AgregarFechaFormato(listasensores:any){
    for await (const sensor of listasensores) {
        this.ObtenerHora(sensor);  
    }
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

  async addmarcados(marcas:any){
    for await(const iterator of marcas) {
      iterator.marcados = false;
    }
    marcas[0].marcados = true;
    return marcas
  }

  async getidsmarcados(){
    const ids = [];
    const sensors = this.listSensors.filter(sensor=> sensor.marcados == true);
    if (sensors !== undefined) {
        for await (const iterator of sensors) {
          ids.push(iterator.id)  
        }
        this.Getdetasesnors(ids);
        return ids    
    }
    return
  }
  async Getdetasesnors(detas:any){
    const data = {ids:detas}
    this.ServiceSensor.Detasensors(detas).subscribe(
      async(resp)=>{
        console.log('reso');
        console.log(resp);
        
        const toprint = await this.convertirfechas(resp.data);
        this.datosprint = toprint;
        await this.colocarprinter(this.datosprint);
        // timesensor: "2023-06-09T18:44:50.000Z", valor: 88.21
        
      }
    )
  }

  async convertirfechas(lista:any[]){
      
    for await (const itera of lista) {

      const nuevafecha = moment(itera.timesensor).format('h:mm:ss')
      itera.timesensor = nuevafecha;
    }
    return lista;   
  }

  async colocarprinter(lista:any[]){
    for await (const itera of lista) {

      this.labelsdatosprint.push(itera.timesensor);
      this.datadataprint.push(itera.valor);
      
    }
    return lista;
  }

}
