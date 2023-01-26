import { Component, OnInit, AfterViewInit} from '@angular/core';
import { faCoffee , faUser} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, AfterViewInit {

  constructor() { }

  faCoffee = faUser;
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
      let user = localStorage.getItem('user');
      console.log('estamos imprimiendo los datos del usuario..');
      console.log(user);
           
  }

}
