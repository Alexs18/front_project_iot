import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { faCoffee, faChartSimple ,faUser,
  faMicrochip, faWifi, faHome, faFolder, faGear, faBell, 
  faComment, faRightFromBracket, faHouse, faFlask} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('bodysidebar', {static:false}) bodysidebar!:ElementRef;
  constructor(
    
  ) { }

  usericon = faUser;
  homeicon = faHome;
  sensoricon = faMicrochip;
  stadisticicon = faChartSimple;
  foldericon = faFolder;
  adminicon = faGear;
  notificationicon = faBell;
  chaticon = faComment;
  logout = faRightFromBracket;
  element = faFlask;
  DatosUsuario:any;
  usuario:string = ''
  home = faHouse;
  listaUsuarios:any[] = []
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
  nav(){
    const data = this.bodysidebar.nativeElement as HTMLElement;
    data.classList.toggle('sidebar-collapse')
  }

}
