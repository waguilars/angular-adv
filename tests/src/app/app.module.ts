import { MedicosComponent } from './medium/espias/medicos.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MedicoComponent } from './medium2/medico/medico.component';
import { HospitalComponent } from './medium2/hospital/hospital.component';
import { IncrementadorComponent } from './medium2/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
