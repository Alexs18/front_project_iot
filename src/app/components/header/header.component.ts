import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faChartSimple ,faUser,
  faMicrochip, faWifi, faHome, faFolder, faGear, faBell, 
  faComment, faRightFromBracket, faHouse, faFlask} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('bodysidebar', {static:false}) bodysidebar!:ElementRef;
  constructor(
    private router:Router
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
  rol:string = ''
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
      this.rol = `${deta.descripcion}`
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
  logoutsection(){
    
    Swal.fire({
      title: 'Estas seguro que deseas cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Si, Hazlo'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        this.router.navigate(['/welcome']); // Redirigir a la página de bienvenida si no ha iniciado sesión
      }
    })

  }

}
