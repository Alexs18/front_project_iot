import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
// import { LegendItem, ChartType } from '../../components/lbd/lbd-chart/lbd-chart.component';
// '../lbd/lbd-chart/lbd-chart.component'
import * as Chartist from 'chartist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  ngOnInit() {
      // this.emailChartType = ChartType.Pie;
      // this.emailChartData = {
      //   labels: ['62%', '32%', '6%'],
      //   series: [62, 32, 6]
      // };

  }
}