import { ElementRef,Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import {  faArrowsRotate, faUser,faRadiation, faMicrochip, faUsers, fa5} from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{

  @ViewChild('dailyload', {static:false}) dailyload!: ElementRef;
  @ViewChild('contaminationgraf', {static:false}) contaminationgraf!:ElementRef;
  constructor(){}
  daily:any;
  fecha:any;
  users = faUsers;
  sensors = faMicrochip;
  update = faRadiation;
  ngOnInit() {
      Chart.register(...registerables)
  }
  ngAfterViewInit(){
    
    let date = this.getdate();
    // this.daily = ;
    new Chart(this.dailyload.nativeElement, {
      type: 'bar',
      data: {
        labels: ['CH3', 'CH2', 'H20', 'CO2', 'PPM'],
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

      
  }
  getdate(){
    let time = new Date();
    let hora = time.getHours();
    let dia = time.getDay();
    let segundos = time.getSeconds();
    this.fecha = `${hora}:${dia}:${segundos}`
    return this.fecha;
  }
  generategraf(){
    const data = {
      labels: [
        'CH3',
        'CH2',
        'H20',
        'PPM',
        'CO2'
      ],
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
}
