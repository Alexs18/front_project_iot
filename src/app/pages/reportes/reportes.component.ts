import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Chart, ChartTypeRegistry, registerables} from 'chart.js'

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

  constructor() { }

  public checked:boolean = true;
  public indeterminate:boolean = false;
  public tagoption:any[] = []
  public charmain:any;

  ngOnInit(): void {
    Chart.register(...registerables)
  }
  ngAfterViewInit(): void {
      this.allsensors('bar');
      this.tiposensores();
  }

  allsensors(type:any){
    this.charmain = new Chart(this.Sensors.nativeElement, {
      type,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Mediciones de todos los sensores',
          data: [12, 19, 3, 5, 2, 3],
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

}
