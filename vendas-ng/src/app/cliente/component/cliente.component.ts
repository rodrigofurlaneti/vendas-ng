import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../models/cliente.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cliente',
  templateUrl: '../component/cliente.component.html',
  styleUrls: ['../component/cliente.component.scss']
})

export class ClienteComponent implements OnInit {

  panelOpenState = false;
  dataSaved = false;  
  clienteForm: any;  
  clienteIdUpdate = null;  
  message = null;  
  clientes: Cliente[];
  clienteById: number;
  cliente = {} as Cliente;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.getClientes();
  }

  //Selecionar todos os clientes
  public getClientes() {
    return this.clienteService.getClientes().subscribe(
                  clientes => { this.clientes = clientes; }, 
                  err => { console.log('Erro ao listar clientes', err);}
                )
  };

  //Deletar um cliente
  public deleteCliente(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe(() => {
      this.getClientes();
    });
  }
  
  //Adicionar cliente
  public addCliente(form: NgForm) {
      if (this.cliente.id !== undefined) {
        this.clienteService.updateCliente(this.cliente).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      } else {
        this.clienteService.addCliente(this.cliente).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      }
    }
  
  //Limpar formulário de cliente
  public cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
  }

  //Editar cliente
  editCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
  }

}