import { Component } from '@angular/core';
import { faEnvelope, faPhone, faLocation, faCircleInfo, faInfo} from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-maindetails',
  templateUrl: './maindetails.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('2000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: ['./maindetails.component.scss']
})
export class MaindetailsComponent {

  v1:boolean = true;
  v2:boolean = false;
  v3:boolean = false;
  v4:boolean = false;
  constructor(){

  }

  faEnvelop = faEnvelope
  phone = faPhone;
  location = faLocation;
  info = faInfo;
  v1funtion(casenumber:number){

    if (casenumber == 1) {
      this.v2 = false;
      this.v3 = false;
      this.v4 = false;
      this.v1 = true;
      return 
    }
    if (casenumber == 2) {
      this.v3 = false;
      this.v4 = false;
      this.v1 = false;
      this.v2 = true;
      return 
    }
    if (casenumber == 3) {
      this.v2 = false;
      this.v4 = false;
      this.v1 = false;
      this.v3 = true;
      return 
    }
    if (casenumber == 4) {
      this.v2 = false;
      this.v3 = false;
      this.v1 = false;
      this.v4 = true;
      return 
    }
  }

  navigateToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  OpenWindows(link:string){
    window.open(link)
  }

}
