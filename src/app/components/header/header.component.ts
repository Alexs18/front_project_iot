import { Component, OnInit } from '@angular/core';
import { faCoffee, faChartSimple ,faUser, faMicrochip, faWifi, faHome, faFolder, faGear, faBell, faComment} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  usericon = faUser;
  homeicon = faHome;
  sensoricon = faMicrochip;
  stadisticicon = faChartSimple;
  foldericon = faFolder;
  adminicon = faGear;
  notificationicon = faBell;
  chaticon = faComment;
  ngOnInit(): void {
  }

}
