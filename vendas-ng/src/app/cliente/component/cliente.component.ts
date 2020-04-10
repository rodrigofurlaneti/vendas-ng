import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: '../component/cliente.component.html',
  styleUrls: ['../component/cliente.component.scss']
})

export class ClienteComponent implements OnInit {

  dataSaved = false;  
  clienteForm: any;  
  clienteIdUpdate = null;  
  message = null;  
  clientes: Array<any> = new Array();

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.getClientes();
  }

  public getClientes() {
    return this.clienteService.getClientes().subscribe(
                  clientes => { this.clientes = clientes; }, 
                  err => { console.log('Erro ao listar clientes', err);}
                )
  };
  
  onFormSubmit() {  
    this.dataSaved = false;  
    const cliente = this.clienteForm.value;  
    this.CreateCliente(cliente);  
    this.clienteForm.reset();  
  } 
  CreateCliente(cliente: Cliente) {  
    if (this.clienteIdUpdate == null) {  
      this.clienteService.createCliente(cliente).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Registro salvo com sucesso';  
          this.getClientes();  
          this.clienteIdUpdate = null;  
          this.clienteForm.reset();  
        }  
      );  
    } else {  
      cliente.id = this.clienteIdUpdate;  
      this.clienteService.updateCliente(this.clienteIdUpdate, cliente).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Registro atualizado com sucesso';  
        this.getClientes();  
        this.clienteIdUpdate = null;  
        this.clienteForm.reset();  
      });  
    }  
  }  
  loadClienteToEdit(Id: string) {  
    this.clienteService.getClienteById(Id).subscribe(cliente => {  
      this.message = null;  
      this.dataSaved = false;  
      this.clienteIdUpdate = cliente.id;  
      this.clienteForm.controls['Nome'].setValue(cliente.nome);  
      this.clienteForm.controls['Email'].setValue(cliente.email);  
    });    
  }  
  deleteCliente(Id: string) {  
    if (confirm("Deseja realmente deletar este cliente ?")) {   
      this.clienteService.deleteClienteById(Id).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Registro deletado com sucesso';  
        this.getClientes();  
        this.clienteIdUpdate = null;  
        this.clienteForm.reset();  
      });  
    }  
  }  
  resetForm() {  
    this.clienteForm.reset();  
    this.message = null;  
    this.dataSaved = false;  
  }
}