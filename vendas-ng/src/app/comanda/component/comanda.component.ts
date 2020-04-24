import { Component, OnInit } from '@angular/core';
import { ComandaService } from '../service/comanda.service';
import { Comanda } from '../models/comanda.model';
import { ClienteService } from '../../cliente/service/cliente.service';
import { Cliente } from '../../cliente/models/cliente.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-comanda',
  templateUrl: '../component/comanda.component.html',
  styleUrls: ['../component/comanda.component.scss']
})
export class ComandaComponent implements OnInit {
  comandas: Comanda[];
  comanda = {} as Comanda;
  clientes: Cliente[];
  constructor(private comandaService: ComandaService, private clienteService: ClienteService) {}
  ngOnInit() {
    this.getComandas();
    this.getClientes();
  }
  //Selecionar todos os comandas
  public getComandas() {
    return this.comandaService.getComandas().subscribe(
                  comandas => { this.comandas = comandas; }, 
                  err => { console.log('Erro ao listar comandas', err);}
                )
  };
  //Selecionar todos os comandas
  public getClientes() {
    return this.clienteService.getClientes().subscribe(
                  clientes => { this.clientes = clientes; }, 
                  err => { console.log('Erro ao listar clientes', err);}
                )
  };
  //Deletar um comanda
  public deleteComanda(comanda: Comanda) {
    this.comandaService.deleteComanda(comanda).subscribe(() => {
      this.getComandas();
    });
  }
  //Adicionar comanda
  public addComanda(form: NgForm) {
    if (this.comanda.id !== undefined) {
        this.comandaService.updateComanda(this.comanda).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      } else {
        this.comandaService.addComanda(this.comanda).subscribe(() => {
          this.cleanForm(form);
          window.location.reload();
        });
      }
    }
  //Limpar formulário de comanda
  public cleanForm(form: NgForm) {
    this.getComandas();
    form.resetForm();
  }
  //Editar comanda
  editComanda(comanda: Comanda) {
    this.comanda = { ...comanda };
  }
}