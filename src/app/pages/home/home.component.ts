import { ElementRef,Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import {  faArrowsRotate, faUser,faRadiation, faMicrochip, faUsers, fa5} from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js';
import { SensoresService } from 'src/app/services/sensores.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{

  @ViewChild('dailyload', {static:false}) dailyload!: ElementRef;
  @ViewChild('contaminationgraf', {static:false}) contaminationgraf!:ElementRef;
  constructor(
    private ServiceSensor:SensoresService,
    private ServiceUser:LoginService
  ){}
  daily:any;
  fecha:any;
  users = faUsers;
  sensors = faMicrochip;
  update = faRadiation;
  activesensors:number = 0;
  activesensorsnot:number = 0;
  listSensors:any[] = [];
  filterlist:any[] = [];
  listaUsuarios:any[] = []
  async ngOnInit() {
      this.GetUser();
      Chart.register(...registerables);
      await this.Getsensors();
  }
  async ngAfterViewInit(){
    
    let date = this.getdate();
    // this.daily = ;
    new Chart(this.dailyload.nativeElement, {
      type: 'bar',
      data: {
        labels: this.filterlist,
        datasets: [{
          label: `Mediciones al día ${date}`,
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
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
    this.generategraf();
    this.Getsensorscount();
    this.Getsensorscountbadn();
      
  }
  getdate(){
    let time = new Date();
    let hora = time.getHours();
    let dia = time.getDay();
    let segundos = time.getSeconds();
    this.fecha = `${hora}:${dia}:${segundos}`
    return this.fecha;
  }
  async Getsensors(){
    this.ServiceSensor.GetSensors().subscribe(async(resp)=>{
      let {listasensor} = resp;
      this.listSensors = listasensor;
      for await (const iterator of listasensor) {
        this.filterlist.push(iterator.elemento_quimico)
      }
    }, error=>{
      console.log('hay un error en el servidor');
      console.log(error);
    })
  }
  generategraf(){
    const data = {
      labels: this.filterlist,
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 10, 50],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    new Chart(this.contaminationgraf.nativeElement, {
      type: 'pie',
      data: data,
    })
  }
  Getsensorscount(){
    this.ServiceSensor.GetSensors().subscribe(async(resp)=>{
      let {listasensor} = resp;
      if (listasensor.length <= 0) {
        return this.activesensors = 0
      }
     
      return this.activesensors = listasensor.length;
    }, error=>{
      console.log('hay un error en el servidor');
      console.log(error);
    })
  }
  Getsensorscountbadn(){
    this.ServiceSensor.GetSensorsDefectuosos().subscribe(async(resp)=>{
      let {listasensor} = resp;
      if (listasensor.length <= 0) {
        return this.activesensorsnot = 0
      }
     
      return this.activesensorsnot = listasensor.length;
    }, error=>{
      console.log('hay un error en el servidor');
      console.log(error);
    })
  }
  GetUser(){
    this.ServiceUser.GetListUser().subscribe(resp=>{
      console.log(resp.users);
      
      this.listaUsuarios = resp.users
    })
  }
}
