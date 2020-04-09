import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: '../component/cliente.component.html',
  styleUrls: ['../component/cliente.component.scss']
})

export class ClienteComponent implements OnInit {

  clientes: Observable<Cliente[]>;  
  dataSaved = false;  
  clienteForm: any;  
  clienteIdUpdate = null;  
  message = null;  
  
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clientes = this.clienteService.getClientes();
  }
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
      cliente.Id = this.clienteIdUpdate;  
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
      this.clienteIdUpdate = cliente.Id;  
      this.clienteForm.controls['Nome'].setValue(cliente.Nome);  
      this.clienteForm.controls['Email'].setValue(cliente.Email);  
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