import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
// import { MenuComponent } from './components/menu/menu.component';
// import { SidebarModule } from './components/sidebar/sidebar.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginService } from './services/login.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DevicesComponent } from './pages/devices/devices.component';
import { MedicionesComponent } from './pages/mediciones/mediciones.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserComponent } from './pages/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SensoresComponent } from './pages/sensores/sensores.component';
import { MainComponent } from './main/main/main.component';
import { MainModule } from './main/main/main.module';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MaindetailsComponent } from './components/maindetails/maindetails.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // UserComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DevicesComponent,
    MedicionesComponent,
    ReportesComponent,
    PerfilComponent,
    GraficasComponent,
    SensoresComponent,
    MainComponent,
    CardComponent,
    MaindetailsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    NgSelectModule,
    FontAwesomeModule,
    MainModule,
    MatCardModule,
    MatCheckboxModule
  ],
  exports:[
    NgSelectModule,
    FontAwesomeModule
    
  ],
  providers: [
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
