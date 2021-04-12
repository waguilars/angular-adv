import { MedicosComponent } from './medium/espias/medicos.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MedicoComponent } from './medium2/medico/medico.component';
import { HospitalComponent } from './medium2/hospital/hospital.component';
import { IncrementadorComponent } from './medium2/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RUTAS } from './advanced/rutas/app.routes';
import { NavbarComponent } from './advanced/navbar/navbar.component';
import { RouterMedicoComponent } from './advanced/router-medico/router-medico.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent,
    NavbarComponent,
    RouterMedicoComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(RUTAS)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
