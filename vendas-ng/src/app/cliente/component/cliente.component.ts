import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: '../component/cliente.component.html',
  styleUrls: ['../component/cliente.component.css']
})
export class ClienteComponent implements OnInit {

  Id: string;
  Nome: string;

  constructor(private clienteService: ClienteService) {
    this.Id = this.clienteService.getId();
    this.Nome = this.clienteService.getNome();
   }

  ngOnInit(): void {
  
  }

}
