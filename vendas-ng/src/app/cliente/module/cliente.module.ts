import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ClienteComponent } from '../component/cliente.component';
import { ClienteService } from '../service/cliente.service';
const appRoutes: Routes = [
  {
    path: 'Cliente',
    component: ClienteComponent,
    data: { title: 'Lista de clientes' }
  },
  {
    path: 'Cliente/:id',
    component: ClienteComponent,
    data: { title: 'Detalhar cliente' }
  },
  /*{
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Product Add' }
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Product Edit' }
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
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
