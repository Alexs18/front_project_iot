import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faCoffee, faChartSimple ,faUser, faMicrochip, faWifi, faHome, faFolder, faGear, faBell, faComment} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor() { }

  usericon = faUser;
  homeicon = faHome;
  sensoricon = faMicrochip;
  stadisticicon = faChartSimple;
  foldericon = faFolder;
  adminicon = faGear;
  notificationicon = faBell;
  chaticon = faComment;
  DatosUsuario:any;
  usuario:string = ''
  ngOnInit(): void {
    this.DatosUsuario = localStorage.getItem("user");
    console.log(this.DatosUsuario);
    
  }

  ngAfterViewInit(): void {
      this.loadstyleperfile();
      const deta = JSON.parse(this.DatosUsuario);
      this.usuario =  `${deta.nombre} ${deta.apellido}`
  }
  loadstyleperfile(){
    const dropdown = document.querySelector(".profile-dropdown");
    const dropdownContent = document.querySelector(".dropdown-content");

      dropdown?.addEventListener("click", function () {
      dropdownContent?.classList.toggle("show");
    });
  }

}
