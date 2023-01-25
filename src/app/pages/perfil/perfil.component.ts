import { Component, OnInit } from '@angular/core';
import { faCoffee , faUser} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  faCoffee = faUser;
  ngOnInit(): void {
  }

}
