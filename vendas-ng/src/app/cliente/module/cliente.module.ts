import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ClienteComponent } from '../component/cliente.component';
import { ClienteService } from '../service/cliente.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    ClienteComponent,
  ],
  exports: [
    ClienteComponent
  ],
  providers: [
    HttpClient,
    ClienteService,
  ]
})
export class ClienteModule { }
