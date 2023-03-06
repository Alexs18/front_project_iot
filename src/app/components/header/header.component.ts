import { Component, OnInit } from '@angular/core';
import { faCoffee , faUser, faMicrochip, faUsers, faWifi} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  faCoffee = faUser;
  ngOnInit(): void {
  }

}
