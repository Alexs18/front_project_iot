import { Component, OnInit } from '@angular/core';
import { faCoffee , faUser, faMicrochip} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit {

  constructor() { }
  FaMicro = faMicrochip
  ngOnInit(): void {
  }

}
