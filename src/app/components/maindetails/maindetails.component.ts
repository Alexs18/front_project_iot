import { Component } from '@angular/core';
import { faEnvelope, faPhone, faLocation, faCircleInfo, faInfo} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-maindetails',
  templateUrl: './maindetails.component.html',
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

  OpenWindows(link:string){
    window.open(link)
  }

}
