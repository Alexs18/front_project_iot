import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DevicesComponent,
    MedicionesComponent,
    ReportesComponent,
    PerfilComponent,
    GraficasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
